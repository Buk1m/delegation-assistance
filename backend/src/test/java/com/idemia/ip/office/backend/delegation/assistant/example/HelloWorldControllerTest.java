package com.idemia.ip.office.backend.delegation.assistant.example;

import com.idemia.ip.office.backend.delegation.assistant.DelegationAssistantApp;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = DelegationAssistantApp.class)
public class HelloWorldControllerTest {

	@Autowired
	private ApplicationContext context;

	private WebTestClient client;

	@Before
	public void setUp() {
		client = WebTestClient.bindToApplicationContext(context).build();
	}

	@Test
	public void testGetHelloWorldMessage() {
		EntityExchangeResult<String> result = client.get().uri("/").exchange()
				.expectStatus().isOk()
				.expectBody(String.class)
				.returnResult();

		Assert.assertEquals("Hello World!", result.getResponseBody());
	}
}
