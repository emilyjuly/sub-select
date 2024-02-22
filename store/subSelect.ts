import { defineStore } from 'pinia';

interface User {
    id: number;
    name: string;
    city: string;
}

interface City {
    id: number;
    name: string;
}

interface Filters {
    city: City[];
}

export const useSubSelectStore = defineStore('subSelect', {
    state: () => ({
        users: [
            {
                id: 0,
                name: 'Fernanda',
                city: 'NY'
            },
            {
                id: 1,
                name: 'Mariana',
                city: 'RJ'
            },
            {
                id: 2,
                name: 'João',
                city: 'SP'
            },
            {
                id: 3,
                name: 'Maria',
                city: 'BH'
            }
        ] as User[],
        filteredUsers: [] as User[],
        city: [
            {
                id: 0,
                name: 'NY'
            },
            {
                id: 1,
                name: 'RJ'
            },
            {
                id: 2,
                name: 'SP'
            },
            {
                id: 3,
                name: 'BH'
            }
        ] as City[],
        filters: {
            city: [] as City[]
        } as Filters,
    }),
    actions: {
        getUsersWithFilters(): void {
            this.filteredUsers = [];

            if (this.filters.city.name) {
                const users = this.users.filter((user) => user.city === this.filters.city.name)
                this.filteredUsers = (users)
            } else {
                this.filteredUsers = (this.users)
            }
        }
    },
})