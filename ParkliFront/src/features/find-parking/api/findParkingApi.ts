import api from "../../../lib/axiosClient";

export const findParkingApi = {
  getAllDriveways: function () {
    return api.get('/api/driveways');
  },
};
