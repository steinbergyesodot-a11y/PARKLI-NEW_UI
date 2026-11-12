import api from "../../../lib/axiosClient";

export const findParkingApi = {
  getAllDriveways: function () {
    return api.get('/api/driveways');
  },
  getDrivewayById: function (id: string) {
    return api.get(`/api/driveways/${encodeURIComponent(id)}`);
  },
  
    updateDrivewayDate: function(drivewayId:string, gameDate:string){
    return api.put(`/api/driveways/${drivewayId}/${gameDate}`);
  },

   
};
