import { apiClient } from './apiClientService';

import { environment } from "../environment/environment";

import { Country } from '../interfaces/Country.interface';

export const countriesService = {

    getAllCities: () =>
        apiClient
            .get<Country[]>(`${environment.apiUrl}/countries`, {
                headers: {
                    'X-CSCAPI-KEY': `${environment.apiKey}`,
                }
            })
            .then((res) => res.data),

    // getById: (id: string) => apiClient.get<Patient>(`/patients/${id}`).then((res) => res.data),

    // create: (data: CreatePatientDto) => apiClient.post<Patient>('/patients', data).then((res) => res.data),

    // update: (id: string, data: Partial<CreatePatientDto>) =>
    //     apiClient.patch<Patient>(`/patients/${id}`, data).then((res) => res.data),

    // delete: (id: string) => apiClient.delete(`/patients/${id}`),
};