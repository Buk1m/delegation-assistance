package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DelegationUserDto {

    private Long id;

    private String login;
}
