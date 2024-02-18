<script setup>
// import { onMounted } from 'vue';
// import { useQuasar } from 'quasar';
//import { useAuthStore } from '@/stores/useAuth';
import router from '@/router';

//import {getEnableKeycloak} from "@/keycloak/config";

//const authStore = useAuthStore();
// import { useAuthStore } from '@features/keycloak/store/useAuthStore';
// const authStore = useAuthStore();

// onMounted(() => {
//   keycloakService.login();
// });

const onSubmit = async () => {
  router.push('/employees');
};

// const $q = useQuasar();
/*
const onSubmit = () => {
    if (authStore.isLoggedIn) {
      keycloakService.logout()
    } else {
      console.log('authStore isLoggedIn', authStore.isLoggedIn);
      keycloakService.login()
    }
  }
*/
/*const onSubmit = async () => {
    try {
      await keycloakService.login();
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };
*/
/*
const onSubmit = async () => {
  try {
    await authStore.login();
  } catch (error) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: error
    });
  }
};

*/

// onMounted(() => {
//   if (authStore.user?.accessToken) {
//     console.log('authStore.user', authStore.user);
//     router.push('/employees');
//   }
// });

// watch(
//   () => authStore.user?.accessToken,
//   (token) => {
//     if (token) {
//       router.push('/employees');
//     }
//   },
// );
</script>

<template>
  <div class="window-height window-width row justify-center items-center">
    <q-card flat bordered class="q-pa-md" style="width: 360px">
      <q-form @submit.stop="onSubmit" class="q-gutter-md">
        <q-card-section class="q-mb-none">
          <div class="text-h6 text-center">로그인</div>
        </q-card-section>
        <q-card-section class="q-mb-none q-gutter-y-lg">
          <q-btn
            type="submit"
            unelevated
            color="primary"
            size="lg"
            class="full-width"
            label="Keycloak Login"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </div>
</template>
