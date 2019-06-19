package com.idemia.ip.office.backend.delegation.assistant.delegations.services;

import com.idemia.ip.office.backend.delegation.assistant.delegations.repositories.DelegationRepository;
import com.idemia.ip.office.backend.delegation.assistant.delegations.utils.OperationType;
import com.idemia.ip.office.backend.delegation.assistant.entities.Delegation;
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    private final DelegationService delegationService;
    private final DelegationRepository delegationRepository;

    public FlightServiceImpl(DelegationService delegationService, DelegationRepository delegationRepository) {
        this.delegationService = delegationService;
        this.delegationRepository = delegationRepository;
    }

    @Override
    public Mono<Flight> addFlight(Flight flight, Authentication authentication, Long delegationId) {
        return delegationService.getDelegation(delegationId, authentication, OperationType.CREATE)
                .flatMap(delegation -> {
                    delegation.getFlights().add(flight);
                    return Mono.fromCallable(() -> delegationRepository.save(delegation))
                            .map(d -> getLastSavedFlight(d));
                });
    }

    @Override
    public Flux<Flight> getFlights(Long delegationId, Authentication authentication) {
        return delegationService.getDelegation(delegationId, authentication, OperationType.READ)
                .map(Delegation::getFlights)
                .flatMapMany(flights -> {
                    flights.sort(Comparator.comparing(Flight::getDepartureDate));
                    return Flux.fromIterable(flights);
                });
    }

    private Flight getLastSavedFlight(Delegation d) {
        List<Flight> flights = d.getFlights();
        if (flights.isEmpty()) {
            throw new IllegalStateException("should not be null");
        }
        return flights.stream()
                .max(Comparator.comparingInt(a -> a.getId().intValue()))
                .orElseGet(() -> flights.get(flights.size() - 1));
    }
}
