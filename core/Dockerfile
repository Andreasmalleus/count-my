FROM gradle:7.6-jdk17 AS gradleImage
WORKDIR /gradle/src/
COPY . .
RUN gradle clean build

FROM eclipse-temurin:17-jre-jammy
WORKDIR /usr/app/

ENV SERVER_PORT=8080
ENV POSTGRES_PORT=5432
ENV RABBIT_PORT=5672
ENV WEB_PORT=3000

ENV POSTGRES_USERNAME=test
ENV POSTGRES_PASSWORD=test
ENV RABBIT_USERNAME=guest
ENV RABBIT_PASSWORD=guest

COPY --from=gradleImage /gradle/src/build/libs/*.jar core-service.jar
ENTRYPOINT ["java","-jar","core-service.jar"]
