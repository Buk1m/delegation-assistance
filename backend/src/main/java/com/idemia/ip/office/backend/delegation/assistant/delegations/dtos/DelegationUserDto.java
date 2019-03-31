package com.idemia.ip.office.backend.delegation.assistant.delegations.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DelegationUserDto {

    private Long id;

    private String login;
}
