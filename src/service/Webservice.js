import axios from "axios";
import router from "../router";

var http = null;
var baseURL = null;
class WebService {
  constructor({ url }) {
    baseURL = url;
    http = axios.create({
      baseURL: url
    });
  }

  _getBaseUrl() {
    return baseURL;
  }

  getAPI({ _action, _body, _buttonId, _hide_loader }) {
    let params = new URLSearchParams();
    for (let key in _body) {
      params.set(key, _body[key]);
    }

    this.addLoader(_buttonId, _hide_loader);

    return http
      .get(_action, {
        params: params,
        headers: this.getHeader()
      })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader);
        return this._errorHandler(e);
      });
  }

  postAPI({ _action, _body, _buttonId, _hide_loader, _no_loader }) {
    this.addLoader(_buttonId, _hide_loader, _no_loader);
    return http
      .post(_action, JSON.stringify(_body), { headers: this.getHeader() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        return this._errorHandler(e);
      });
  }

  postWithoutAPI({ _action, _body, _buttonId, _hide_loader, _no_loader }) {
    this.addLoader(_buttonId, _hide_loader, _no_loader);
    return http
      .post(_action, JSON.stringify(_body), { headers: this.getHeader() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        if (e.response.status === 404) {
          throw new Error(404);
        } else {
          return this._errorHandler(e);
        }
      });
  }

  postRegisterAPI({ _action, _body, _buttonId, _hide_loader, _no_loader }) {
    this.addLoader(_buttonId, _hide_loader, _no_loader);
    return http
      .post(_action, JSON.stringify(_body), { headers: this.getHeader() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader, _no_loader);
        if (e.response.status === 403) {
          throw new Error(403);
        } else {
          return this._errorHandler(e);
        }
      });
  }

  putAPI({ _action, _body, _buttonId, _hide_loader }) {
    this.addLoader(_buttonId, _hide_loader);
    return http
      .put(_action, JSON.stringify(_body), { headers: this.getHeader() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader);
        return this._errorHandler(e);
      });
  }

  deleteAPI({ _action, _buttonId, _hide_loader }) {
    this.addLoader(_buttonId, _hide_loader);
    return http
      .delete(_action, { headers: this.getHeader() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader);
        return this._errorHandler(e);
      });
  }

  getAccesstoken({ _action, _body, _buttonId, _hide_loader }) {
    this.addLoader(_buttonId, _hide_loader);
    var headers = {};

    headers["Content-Type"] = "application/json";

    return http
      .post(_action, JSON.stringify(_body), { headers: headers })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader);
        return this._loginErrorHandler(e);
      });
  }

  uploadImageAPI({ _action, _file, _key, _body, _buttonId, _hide_loader }) {
    if (!_key) {
      _key = "file";
    }
    this.addLoader(_buttonId, _hide_loader);
    let formData = new FormData();

    formData.append(_key, _file);
    for (let key in _body) {
      formData.append(key, _body[key]);
    }

    return http
      .post(_action, formData, { headers: this.addHeaderForMultipart() })
      .then(response => {
        this.removeLoader(_buttonId, _hide_loader);
        return response.data;
      })
      .catch(e => {
        this.removeLoader(_buttonId, _hide_loader);
        return this._errorHandler(e);
      });
  }

  _loginErrorHandler(error) {
    if (error.response != null) {
      error = error.response;
    }

    var errorMessage;
    if (!error || !error.status) {
      errorMessage = "Server Not Responding";
    } else if (
      error.status == 400 ||
      error.status == 404 ||
      error.status == 401
    ) {
      errorMessage =
        (error && error.data.message) || "Invalid Username or Password";

      if (error.data.send_to_reset_password == "Y") {
        router.push("/reset-password");
      }
    } else if (error.status == 500) {
      errorMessage = "Server Error";
    } else {
      errorMessage = (error && error.data.message) || "Bad Response";
    }

    // alert(errorMessage)
    throw new Error(errorMessage);
  }
  _errorHandler(error) {
    if (error.response != null) {
      error = error.response;
    }
    var errorMessage;
    if (!error || !error.status) {
      errorMessage = "Server Not Responding";
    } else if (error.status == 401) {
      errorMessage =
        (error && error.data.message) || "Incorrect username or password";
      localStorage.removeItem("access_token");
      this.logout();
    } else if (error.status == 500) {
      errorMessage = "Server Error";
    } else {
      errorMessage = (error && error.data.message) || "Bad Response";
    }

    // alert(errorMessage)
    throw new Error(errorMessage);
  }

  logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  getHeader() {
    var headers = {};
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    headers["appversion"] = "1.0";
    headers["platform"] = "WEB";
    if (localStorage.getItem("locale")) {
      headers["applocale"] = localStorage.getItem("locale");
    } else {
      headers["applocale"] = "en";
    }

    if (localStorage.getItem("access_token")) {
      headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
    }

    return headers;
  }

  addHeaderForMultipart() {
    if (localStorage.getItem("access_token")) {
      var headers = {};
      if (localStorage.getItem("access_token")) {
        headers["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
      }

      return headers;
    } else {
      // logout app
    }
  }

  addLoader(id, _hide_loader, _no_loader) {
    if (id) {
      var button = document.getElementById(id);
      button.disabled = true;
      var loader = document.createElement("i");
      loader.className = "fa fa-spinner fa-spin mr-2";
      button.prepend(loader);
    }
    if (!_hide_loader && !(_no_loader != null && _no_loader)) {
      this.ajaxindicatorstart("Loading...Please Wait...!!!");
    }
  }

  removeLoader(id, _hide_loader, _no_loader) {
    if (id) {
      var button = document.getElementById(id);
      button.disabled = false;
      button.removeChild(button.childNodes[0]);
    }
    if (!_hide_loader && !(_no_loader != null && _no_loader)) {
      this.ajaxindicatorstop();
    }
  }

  ajaxindicatorstart(text) {
    text = "";
    if (
      $("body")
        .find("#resultLoading")
        .attr("id") != "resultLoading"
    ) {
      $("body").append(
        "<div id='resultLoading' style='display:none'><div><img src='/static/img/ajax-loader2.gif'><div>" +
          text +
          "</div></div><div class='bg'></div></div>"
      );
    }

    $("#resultLoading").css({
      width: "100%",
      height: "100%",
      position: "fixed",
      "z-index": "10000000",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto"
    });

    // $('#resultLoading .bg').css({
    //   'background': '#000000',
    //   'opacity': '0.7',
    //   'width': '100%',
    //   'height': '100%',
    //   'position': 'absolute',
    //   'top': '0'
    // });

    $("#resultLoading>div:first").css({
      width: "550px",
      height: "-100px",
      "text-align": "center",
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      "font-size": "16px",
      "z-index": "10",
      color: "#000000"
    });

    $("#resultLoading .bg").height("100%");
    $("#resultLoading").fadeIn(100);
    $("body").css("cursor", "wait");
  }

  ajaxindicatorstop() {
    $("#resultLoading .bg").height("100%");
    $("#resultLoading").fadeOut(100);
    $("body").css("cursor", "default");
  }
}

export default new WebService({
  url: "http://127.0.0.1:8000/admin/"
  // url: 'https://wonderparkapi.winayak.com/admin/'
});
