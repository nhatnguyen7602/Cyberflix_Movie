// Obj gồm các cách lưu dữ liệu USER vào local storage
// tạo biến USER 
const USER = "USER";
// tạo biến obj localServ chứa các thao tác xử lí
export const localServ = {
  // tạo biến chứa các thao tác liên quan đến người dùng - USER
  user: {
    setItem: (dataLogin) => {
      let jsonData = JSON.stringify(dataLogin);
      localStorage.setItem(USER, jsonData);
    },
    get: () => {
      let jsonData = localStorage.getItem(USER);
      if (jsonData) {
        return JSON.parse(jsonData);
      } else {
        return null;
      }
    },
    getItem: () => {
      let jsonData = localStorage.getItem(USER);
      if (jsonData) {
        return JSON.parse(jsonData);
      } else {
        return null;
      }
    },
    remove: () => {
      localStorage.removeItem(USER);
    },
  },
  // service gọi user từ localstorage nếu đã có biến USER được lưu
};
