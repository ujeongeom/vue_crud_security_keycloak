import { defineStore, acceptHMRUpdate } from 'pinia';
import { fetchWrapper } from '@/helpers';

const employeeUrl = '/api/v1/employees';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    isLoading: false,
  }),
  actions: {
    // 모든 임직원 조회
    async getEmployees() {
      try {
        this.isLoading = true;
        this.employees = await fetchWrapper.get(employeeUrl);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 임직원 추가
    async addEmployee(employee) {
      try {
        this.isLoading = true;
        const newEmployee = await fetchWrapper.post(employeeUrl, employee);
        this.employees.push(newEmployee);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 특정 임직원 삭제
    async deleteEmployee(id) {
      try {
        this.isLoading = true;
        const deletedEmployee = await fetchWrapper.post(
          `/api/v1/employee/${id}`,
        );
        this.employees = this.employees.filter(
          (t) => t.id !== deletedEmployee.id,
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 특정 임직원 수정
    async editEmployee(id, employee) {
      console.log(id, { employee });
      try {
        this.isLoading = true;
        let target = this.employees.find((t) => t.id === id);

        if (!target) return;

        const updatedEmployee = await fetchWrapper.post(
          `${employeeUrl}/${id}`,
          employee,
        );

        target.empName = updatedEmployee.empName;
        target.empDeptName = updatedEmployee.empDeptName;
        target.empTelNo = updatedEmployee.empTelNo;
        target.empMail = updatedEmployee.empMail;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot));
}
