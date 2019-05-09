FROM openjdk:11.0.2-jdk-slim-stretch
VOLUME /tmp

WORKDIR /opt/app

ARG JAR_FILE
ADD target/${JAR_FILE} /opt/app/delegation-assistant.jar
ADD target/classes/jwt.key /opt/app/conf/jwt.key

ENV SPRING_PROFILES_ACTIVE=dev

EXPOSE 8080

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/opt/app/delegation-assistant.jar", \
            "--jwt.private-key-file-path=/opt/app/conf"]
