export const OPEN_SIDEMENU = 'OPEN_SIDEMENU';
export const CLOSE_SIDEMENU = 'CLOSE_SIDEMENU';

export const openSidemenu = () => {
  return {
    type: OPEN_SIDEMENU
  }
}

export const closeSidemenu = () => {
  return {
    type: CLOSE_SIDEMENU
  }
}