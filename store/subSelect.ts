import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import {fetchGeocodingData} from "~/services/geocoding";

interface City {
    nome: string;
    id: number;
}

interface Filters {
    state: string,
    region: string
}

interface FilteredCities {
    id: number,
    nome: string,
    estado: string,
    regiao: string
}

export const useSubSelectStore = defineStore('subSelect', {
    state: () => ({
        filters: {
            state: '',
            region: ''
        } as Filters,
        filteredCities: [] as FilteredCities[],
        states: [] as string[],
        regions: [] as string[],
        location: [] as string[],
        citySelect: '' as string
    }),
    actions: {
        async getCities(): Promise<City[]> {
            this.filteredCities = []
            try {
                const response: AxiosResponse<City[]> = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes-imediatas');
                const cities: FilteredCities[] = []
                response.data.map((c) => {
                    cities.push({
                        id: c.id,
                        nome: c.nome,
                        estado: c['regiao-intermediaria'].UF.nome,
                        regiao: c['regiao-intermediaria'].UF.regiao.nome
                    })
                    this.getState(c['regiao-intermediaria'].UF.nome)
                    this.getRegion(c['regiao-intermediaria'].UF.regiao.nome)
                })

                this.filteredCities = cities.filter((city) => {
                    return (
                        (!this.filters.state || city.estado === this.filters.state) &&
                        (!this.filters.region || city.regiao === this.filters.region)
                    );
                });

                return response.data;
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
                throw error;
            }
        },
        getState(state: string): void {
            const exists = this.states.find((s) => s === state)
            if (!exists) {
                this.states.push(state)
            }
        },
        getRegion(region: string): void {
            const exists = this.regions.find((r) => r === region)
            if (!exists) {
                this.regions.push(region)
            }
        },
        async changeLocation(): Promise<void> {
            this.location = []
            const apiKey = useRuntimeConfig().public.API_KEY_GEO;

            try {
                const result: AxiosResponse = await fetchGeocodingData(apiKey, this.citySelect);
                if (result) {
                    this.location.push(result.results[result.results.length -1].bbox.lat1)
                    this.location.push(result.results[result.results.length -1].bbox.lon1)
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
})