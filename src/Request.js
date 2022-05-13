/* eslint-disable */
import axios from "axios";

const request = axios.create({
    baseURL: process.env.API_BASE_URL || "https://myhealthbuddyapp.herokuapp.com"
});

let timeout = 5000;

class Request {
  /**
   * Wrapper for Axios GET calls
   *
   * @method get
   * @static
   * @param {string} route, the API route
   * @param {object} params, any parameters passed to the call
   * @param {function} callback, a callback function
   */
  static get(route, params, callback) {
    if (params?.timeout) {
      timeout = params.timeout;
    }

    return request
      .get(route, {
        params,
        timeout,
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })
      .then(res => {
        // Logger._log('Request GET', route, params, res)

        if ("function" === typeof callback) {
          return callback(res?.data);
        }

        return res?.data;
      })
      .catch(e => {
        // Logger._error('Request GET Error', route, params, e)

        // uBlock doesn't allow us to grab the user's IP
        if (route.includes("ipify")) {
          if ("function" === typeof callback) {
            return callback();
          }
        } else {
          return e;
        }
      });
  }

  /**
   * Wrapper for Axios POST calls
   *
   * @method post
   * @static
   * @param {string} route, the API route
   * @param {object} body, key value pairs passed to the call
   * @param {function} callback, a callback function
   */
  static post(route, body, callback) {
    if (body?.timeout) {
      timeout = body.timeout;
    }

    return request
      .post(route, body, { 
          timeout,
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} 
        })
      .then(res => {
        if (res.data.success) {
          // Logger._log('Request POST', route, body, res)
        } else {
          // Logger._log('Request POST Error', res)
        }

        if ("function" === typeof callback) {
          return callback(res?.data);
        }

        return res?.data;
      })
      .catch(e => {
        // Logger._log('Request POST Error', route, body, e)

        if ("function" === typeof callback) {
          return callback(e);
        }

        return e;
      });
  }

  /**
   * Wrapper for Axios PUT calls
   *
   * @method post
   * @static
   * @param {string} route, the API route
   * @param {object} body, key value pairs passed to the call
   * @param {function} callback, a callback function
   */
   static put(route, body, callback) {
    if (body?.timeout) {
      timeout = body.timeout;
    }

    return request
      .put(route, body, { 
          timeout,
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} 
        })
      .then(res => {
        if (res.data.success) {
          // Logger._log('Request PUT', route, body, res)
        } else {
          // Logger._log('Request PUT Error', res)
        }

        if ("function" === typeof callback) {
          return callback(res?.data);
        }

        return res?.data;
      })
      .catch(e => {
        // Logger._log('Request PUT Error', route, body, e)

        if ("function" === typeof callback) {
          return callback(e);
        }

        return e;
      });
  }
}

export default Request;
