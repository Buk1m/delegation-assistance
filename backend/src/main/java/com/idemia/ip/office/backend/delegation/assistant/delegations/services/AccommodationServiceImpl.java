package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.entities.Accommodation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.List;

@Service
public class AccommodationServiceImpl implements AccommodationService {

    private final DelegationService delegationService;
    private final DelegationRepository delegationRepository;

    public AccommodationServiceImpl(DelegationService delegationService, DelegationRepository delegationRepository) {
        this.delegationService = delegationService;
        this.delegationRepository = delegationRepository;
    }

    @Override
    public Mono<Accommodation> addAccommodation(Accommodation accommodation,
            String delegatedEmployeeLogin,
            Long delegationId) {
        return delegationService.getDelegation(delegationId, delegatedEmployeeLogin).flatMap(delegation -> {
            delegation.getAccommodations().add(accommodation);
            return Mono.fromCallable(() -> delegationRepository.save(delegation))
                    .map(d -> getLastSavedAccommodation(d));
        });
    }

    private Accommodation getLastSavedAccommodation(Delegation d) {
        List<Accommodation> accList = d.getAccommodations();
        if (accList.isEmpty()) {
            throw new IllegalStateException("should not be null");
        }
        return accList.stream()
                .max(Comparator.comparingInt(a -> a.getId().intValue()))
                .orElseGet(() -> accList.get(accList.size() - 1));
    }
}
