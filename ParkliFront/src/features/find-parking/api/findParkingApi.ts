import api from "../../../lib/axiosClient";

export const findParkingApi = {
  getAllDriveways: function () {
    return api.get('/api/driveways');
  },
  getDrivewayById: function (id: string) {
    return api.get(`/api/driveways/${encodeURIComponent(id)}`);
  },
};
