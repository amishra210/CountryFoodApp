'use strict';

var app = angular.module('com.module.user');

app.service('CoreService', function (SweetAlert) {

    this.alert = function (title, text) {
        SweetAlert.swal(title, text);
    };

    this.alertSuccess = function (title, text) {
        SweetAlert.swal(title, text, 'success');
    };

    this.alertError = function (title, text) {
        SweetAlert.swal(title, text, 'error');
    };

    this.alertWarning = function (title, text) {
        SweetAlert.swal(title, text, 'warning');
    };

    this.alertInfo = function (title, text) {
        SweetAlert.swal(title, text, 'info');
    };

    this.confirm = function (title, text, successCb, cancelCb) {
        var config = {
            title: title,
            text: text,
            showCancelButton: true,
            cancelButtonText: "CANCEL",
            confirmButtonText: "RESTORE",
            confirmButtonColor: '#f0ad4e',
            allowOutsideClick: false
        };
        this._swal(config, successCb, cancelCb);
    };

    this.confirmation = function (title, text, successCb, cancelCb) {
        var config = {
            title: title,
            text: text,
            showCancelButton: true,
            cancelButtonText: "CANCEL",
            confirmButtonText: "DELETE",
            confirmButtonColor: '#DD6B55',
            allowOutsideClick: false
        };
        this._swal(config, successCb, cancelCb);
    };
    this.pluginConfirmation = function (title, text, btnText, successCb, cancelCb) {
        var config = {
            title: title,
            text: text,
            showCancelButton: true,
            cancelButtonText: "CANCEL",
            confirmButtonText: btnText,
            confirmButtonColor: '#DD6B55',
            allowOutsideClick: false
        };
        this._swal(config, successCb, cancelCb);
    };
    this.cancel = function (title, text, successCb, cancelCb) {
        var config = {
            title: title,
            text: text,
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonText: "YES",
            confirmButtonColor: '#5bc0de',
            allowOutsideClick: false
        };
        this._swal(config, successCb, cancelCb);
    };

    this._swal = function (config, successCb, cancelCb) {
        SweetAlert.swal(config,
            function (confirmed) {
                if (confirmed) {
                    successCb();
                } else {
                    cancelCb();
                }
            });
    };

    this.prompt = function (title, text, successCb) {
        var config = {
            title: title,
            text: text,
            type: 'info',
            showCancelButton: false,
            confirmButtonColor: '#5bc0de',
            allowOutsideClick: false
        };
        this._swalp(config, successCb);
    };

    this._swalp = function (config, successCb) {
        SweetAlert.swal(config,
            function (confirmed) {
                if (confirmed) {
                    successCb();
                }
            });
    };

});





