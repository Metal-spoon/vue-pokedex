import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faAngleDown, faCheck, faPlus, faSpinner, faTrashCan, faTriangleExclamation, faXmark} from '@fortawesome/free-solid-svg-icons'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDown);
library.add(faAngleRight);
library.add(faTrashCan);
library.add(faPlus);
library.add(faXmark);
library.add(faCheck);
library.add(faTriangleExclamation);
library.add(faSpinner);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
