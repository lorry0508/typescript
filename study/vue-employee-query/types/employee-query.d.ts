import Vue from 'vue';

declare class EmployeeQuery extends Vue {
    name: string
    slected: number
    department: {
        department: string,
        departmentId: number
    }[]
    query(): void
}

export as namespace EmployeeQuery;

export = EmployeeQuery;