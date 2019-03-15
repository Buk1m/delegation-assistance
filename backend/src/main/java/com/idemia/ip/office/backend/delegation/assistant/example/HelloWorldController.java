package com.idemia.ip.office.backend.delegation.assistant.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class HelloWorldController {

	@GetMapping("/")
	public Mono<ResponseEntity<String>> getHelloWorldMessage() {
		return Mono.just("Hello World!").map(ResponseEntity::ok);
	}
}
