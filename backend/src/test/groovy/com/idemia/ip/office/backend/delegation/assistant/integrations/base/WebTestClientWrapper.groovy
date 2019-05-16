package com.idemia.ip.office.backend.delegation.assistant.integrations.base

import com.fasterxml.jackson.databind.ObjectMapper
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthData
import com.idemia.ip.office.backend.delegation.assistant.security.dtos.AuthToken
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.web.reactive.function.BodyInserters

import static org.springframework.http.HttpHeaders.AUTHORIZATION
import static org.springframework.http.HttpMethod.*
import static org.springframework.http.MediaType.APPLICATION_JSON

@Component
class WebTestClientWrapper {
    @Autowired
    private WebTestClient webTestClient
    @Autowired
    private ObjectMapper objectMapper

    def <T> T get(String uri, AuthToken auth, HttpStatus expectedStatus, Class<T> responseClazz, MediaType contentType = APPLICATION_JSON) {
        WebTestClient.ResponseSpec response = sendGetRequest(uri, contentType, auth, expectedStatus)
        getResponseBody(response, responseClazz)
    }

    WebTestClient.ResponseSpec get(String uri, AuthToken auth, MediaType contentType = APPLICATION_JSON) {
        sendRequest(GET, uri, auth, null, contentType)
    }

    def <T, C extends Collection<T>> C getCollection(String uri, AuthToken auth, HttpStatus expectedStatus, Class<T> objectClazz, Class<C> collectionClazz, MediaType contentType = APPLICATION_JSON) {
        WebTestClient.ResponseSpec response = sendGetRequest(uri, contentType, auth, expectedStatus)

        byte[] responseBody = response.expectBody()
                .returnResult()
                .responseBody

        String jsonResponse = new String(responseBody)
        objectMapper.readValue(jsonResponse, objectMapper.getTypeFactory().constructCollectionType(collectionClazz, objectClazz))
    }

    void delete(String uri, AuthToken auth, HttpStatus expectedStatus, MediaType contentType = APPLICATION_JSON) {
        sendDeleteRequest(uri, contentType, auth, expectedStatus)
    }

    WebTestClient.ResponseSpec delete(String uri, AuthToken auth, MediaType contentType = APPLICATION_JSON) {
        sendRequest(DELETE, uri, auth, null, contentType)
    }

    def <T> T post(String uri, AuthToken auth, Object body, HttpStatus expectedStatus, Class<T> responseClazz, MediaType contentType = APPLICATION_JSON) {
        WebTestClient.ResponseSpec response = sendPostRequest(uri, contentType, auth, body, expectedStatus)

        getResponseBody(response, responseClazz)
    }

    WebTestClient.ResponseSpec post(String uri, AuthToken auth, Object body, MediaType contentType = APPLICATION_JSON) {
        sendRequest(POST, uri, auth, body, contentType)
    }

    def <T> T put(String uri, AuthToken auth, Object body, HttpStatus expectedStatus, Class<T> responseClazz, MediaType contentType = APPLICATION_JSON) {
        WebTestClient.ResponseSpec response = sendPutRequest(uri, contentType, auth, body, expectedStatus)

        getResponseBody(response, responseClazz)
    }

    WebTestClient.ResponseSpec put(String uri, AuthToken auth, Object body, MediaType contentType = APPLICATION_JSON) {
        sendRequest(PUT, uri, auth, body, contentType)
    }

    def <T> T patch(String uri, AuthToken auth, Object body, HttpStatus expectedStatus, Class<T> responseClazz, MediaType contentType = APPLICATION_JSON) {
        WebTestClient.ResponseSpec response = sendPatchRequest(uri, contentType, auth, body, expectedStatus)

        getResponseBody(response, responseClazz)
    }

    WebTestClient.ResponseSpec patch(String uri, AuthToken auth, Object body, MediaType contentType = APPLICATION_JSON) {
        sendRequest(PATCH, uri, auth, body, contentType)
    }

    AuthToken signIn(String login, String password) {
        AuthData authData = new AuthData()
        authData.login = login
        authData.password = password

        WebTestClient.ResponseSpec response = signInServer(authData)

        getResponseBody(response, AuthToken.class)
    }

    private WebTestClient.ResponseSpec sendGetRequest(String uri, MediaType contentType, AuthToken auth, HttpStatus expectedStatus) {
        sendRequest(GET, uri, auth, expectedStatus, null, contentType)
    }

    private WebTestClient.ResponseSpec sendPatchRequest(String uri, MediaType contentType, AuthToken auth, Object body, HttpStatus expectedStatus) {
        sendRequest(PATCH, uri, auth, expectedStatus, body, contentType)
    }

    private WebTestClient.ResponseSpec sendPostRequest(String uri, MediaType contentType, AuthToken auth, Object body, HttpStatus expectedStatus) {
        sendRequest(POST, uri, auth, expectedStatus, body, contentType)
    }

    private WebTestClient.ResponseSpec sendPutRequest(String uri, MediaType contentType, AuthToken auth, Object body, HttpStatus expectedStatus) {
        sendRequest(PUT, uri, auth, expectedStatus, body, contentType)
    }

    private WebTestClient.ResponseSpec sendDeleteRequest(String uri, MediaType contentType, AuthToken auth, HttpStatus expectedStatus) {
        sendRequest(DELETE, uri, auth, expectedStatus, null, contentType)
    }

    private WebTestClient.ResponseSpec signInServer(AuthData authData) {
        webTestClient.post()
                .uri('/auth')
                .body(BodyInserters.fromObject(authData))
                .exchange()
                .expectStatus().isOk()
    }

    private WebTestClient.ResponseSpec sendRequest(HttpMethod httpMethod, String uri, AuthToken auth, Object body, MediaType contentType) {
        def request = webTestClient.method(httpMethod)
                .uri(uri)
                .contentType(contentType)
                .header(AUTHORIZATION, "Bearer ${auth.token}")

        if (body != null) {
            request.syncBody(body)
        }

        request.exchange()
    }

    private WebTestClient.ResponseSpec sendRequest(HttpMethod httpMethod, String uri, AuthToken auth, HttpStatus responseStatus, Object body, MediaType contentType) {
        sendRequest(httpMethod, uri, auth, body, contentType)
                .expectStatus().isEqualTo(responseStatus)
    }

    private <T> T getResponseBody(WebTestClient.ResponseSpec response, Class<T> tClass) {
        response.returnResult(tClass)
                .responseBody
                .blockLast()
    }
}
