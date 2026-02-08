"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDb = void 0;
var admin = require("firebase-admin");
var app_1 = require("firebase-admin/app");
var serviceAccount = require('../../../serviceAccountKey.json');
if (!(0, app_1.getApps)().length) {
    admin.initializeApp({
        credential: (0, app_1.cert)(serviceAccount),
    });
}
var adminDb = admin.firestore();
exports.adminDb = adminDb;
