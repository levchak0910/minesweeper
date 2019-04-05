import "../styles/quasar.styl";
import "quasar-extras/animate";
import "quasar-extras/roboto-font";
import "quasar-extras/material-icons";

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Quasar,
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutFooter,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QIcon,
  QInput,
  QField,
  QSlider,
  QTable,
  QSelect,
} from "quasar";


export default {
  install(Vue) {
    Vue.use(Quasar, {
      components: {
        QBtn,
        QLayout,
        QLayoutHeader,
        QLayoutDrawer,
        QPage,
        QPageContainer,
        QToolbar,
        QToolbarTitle,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QLayoutFooter,
        QIcon,
        QInput,
        QField,
        QSlider,
        QTable,
        QSelect,
      },
    });
  },
};
