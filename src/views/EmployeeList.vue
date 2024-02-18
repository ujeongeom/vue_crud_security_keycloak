<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          round
          dense
          flat
          :ripple="false"
          :icon="fabGithub"
          size="19px"
          color="white"
          class="q-mr-sm"
          no-caps
        />

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
        >
          <a href="javascript:void(0)" class="text-white"> Employee </a>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn dense flat>
            <div class="row items-center no-wrap">
              <q-icon name="add" size="20px" />
            </div>
          </q-btn>

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="q-pa-md">
          <q-table
            flat
            bordered
            title="임직원 현황"
            :rows="employees"
            :columns="columns"
            no-data-label="No Employee"
            row-key="username"
            :loading="isLoading"
          >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  flat
                  round
                  color="warning"
                  icon="edit"
                  @click="onEdit(props.row)"
                ></q-btn>
                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  @click="onDelete(props.row)"
                ></q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const columns = [
  {
    name: 'empName',
    required: true,
    label: '이름',
    align: 'left',
    field: (row) => row.empName,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'empDeptName',
    align: 'left',
    label: '부서명',
    field: 'empDeptName',
    sortable: true,
  },
  {
    name: 'empTelNo',
    align: 'left',
    label: '전화번호',
    field: 'empTelNo',
    sortable: true,
  },
  { name: 'empMail', align: 'left', label: '이메일', field: 'empMail' },
  { name: 'actions', align: 'left', label: 'Actions' },
];

import { fabGithub } from '@quasar/extras/fontawesome-v6';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia';
import { useEmployeeStore } from '@/stores/employee';
import { useAuthStore } from '@/stores/useAuth';
const employeeStore = useEmployeeStore();
const { employees, isLoading } = storeToRefs(employeeStore);
const { getEmployees } = employeeStore;

const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.user?.accessToken) {
    return router.push('/login');
  }
  // fetch
  getEmployees();
});

const router = useRouter();
const onEdit = (props) => {
  // console.log('onEdit: ' + JSON.stringify(props))
  router.push(`/employees/${props.id}`);
};
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
@/stores/useEmployee
