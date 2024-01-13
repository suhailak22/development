import { api } from "./Api";

export const Fetch = {
  getProperties: (data) => {
    return api.getMethod("Properties/show?" + data, data);
  },
  getPropertiesCount: (data) => {
    return api.getMethod("Properties/get_property_count?" + data, data);
  },
  getUsersCount: (data) => {
    return api.getMethod("Users/get_user_count?" + data, data);
  },
  getSingleProperty: (data) => {
    return api.getMethod("Properties/show?" + data, data);
  },
  getLocation: (data) => {
    return api.getMethod("Location/getLocation?" + data, data);
  },
  getUsers: (data) => {
    return api.getMethod("Users/show?" + data, data);
  },
  getPayment: (data) => {
    return api.getMethod("Payments/show?" + data, data);
  },
  getForm: (data) => {
    return api.getMethod("Forms/show?" + data, data);
  },
  changeStatus: (data) => {
    return api.postMethod("Properties/update", data);
  },
  updateAdminToken: (data) => {
    return api.postMethod("Login/update_admin_token", data);
  },
  get_admin_notification_list: (data) => {
    return api.getMethod("Notify/get_admin_notification_list", data);
  },
  update_admin_notification: (data) => {
    return api.postMethod("Notify/update_admin_notification", data);
  },
  get_blogs: (data) => {
    return api.getMethod("Blogs2/show", data);
  },
  update_blog: (data) => {
    return api.postFormMethod("Blogs2/update", data);
  },
  post_blog: (data) => {
    return api.postFormMethod("Blogs2/create", data);
  },
  delete_blog: (data) => {
    return api.postMethod("Blogs2/delete", data);
  },
  get_banners: (data) => {
    return api.getMethod("Banner/show", data);
  },
  update_banner: (data) => {
    return api.postFormMethod("Banner/update", data);
  },
  post_banner: (data) => {
    return api.postFormMethod("Banner/create", data);
  },
  delete_banner: (data) => {
    return api.postMethod("Banner/delete", data);
  },
  update_request: (data) => {
    return api.postMethod("Forms/update_status", data);
  },
  get_reports: (data) => {
    return api.getMethod("Reports/show?" + data, data);
  },
  block_user: (data) => {
    return api.postMethod("users/bloc   k_user", data);
  },
  get_states: (data) => {
    return api.getMethod("Location/getLocation?location=state" + data, data);
  },
  get_cities: (data) => {
    return api.getMethod(
      "Location/getLocation?location=city&state=" + data,
      data
    );
  },
  get_localities: (data) => {
    return api.getMethod("Location/get_locality?city=" + data, data);
  },
  add_locality: (data) => {
    return api.postMethod("location/add_locality", data);
  },
  update_locality: (data) => {
    return api.postMethod("location/update_locality", data);
  },
  delete_locality: (data) => {
    return api.postMethod("location/delete_locality", data);
  },
  search_locality: (data) => {
    return api.postMethod("location/search_locality?" + data, data);
  },
};
