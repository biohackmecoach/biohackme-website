"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.completeAssessment = exports.subscribeToMasterclass = exports.subscribeToNewsletter = void 0;
var functions = __importStar(require("firebase-functions"));
var cors_1 = require("./cors");
// Mailchimp configuration
var MAILCHIMP_API_KEY = 'a0ea152d1144e3b3d7d6c117d914e686-us4';
var AUDIENCE_ID = 'e84f95f298';
var DATACENTER = 'us4'; // Extracted from API key
exports.subscribeToNewsletter = functions.https.onRequest(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Handle CORS
        (0, cors_1.cors)(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, firstName, lastName, emailRegex, subscriberData, mailchimpUrl, response, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Only allow POST requests
                        if (req.method !== 'POST') {
                            res.status(405).json({ error: 'Method not allowed' });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName;
                        if (!email) {
                            res.status(400).json({ error: 'Email is required' });
                            return [2 /*return*/];
                        }
                        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                            res.status(400).json({ error: 'Invalid email format' });
                            return [2 /*return*/];
                        }
                        subscriberData = {
                            email_address: email,
                            status: 'subscribed'
                        };
                        // Add name fields if provided
                        if (firstName || lastName) {
                            subscriberData.merge_fields = {
                                FNAME: firstName || '',
                                LNAME: lastName || ''
                            };
                        }
                        mailchimpUrl = "https://".concat(DATACENTER, ".api.mailchimp.com/3.0/lists/").concat(AUDIENCE_ID, "/members");
                        return [4 /*yield*/, fetch(mailchimpUrl, {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Basic ".concat(Buffer.from("anystring:".concat(MAILCHIMP_API_KEY)).toString('base64')),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(subscriberData)
                            })];
                    case 2:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _b.sent();
                        if (response.ok) {
                            res.status(200).json({
                                success: true,
                                message: 'Successfully subscribed to newsletter!',
                                email: email
                            });
                        }
                        else {
                            // Handle Mailchimp errors
                            if (data.title === 'Member Exists') {
                                res.status(400).json({
                                    error: 'This email is already subscribed to our newsletter.'
                                });
                            }
                            else {
                                console.error('Mailchimp API error:', data);
                                res.status(400).json({
                                    error: data.detail || 'Failed to subscribe. Please try again.'
                                });
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Newsletter subscription error:', error_1);
                        res.status(500).json({
                            error: 'Internal server error. Please try again later.'
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// Masterclass Pre-registration Function
exports.subscribeToMasterclass = functions.https.onRequest(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Handle CORS
        (0, cors_1.cors)(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, firstName, lastName, emailRegex, subscriberData, mailchimpUrl, response, data, crypto_1, emailHash, updateUrl, updateResponse, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Only allow POST requests
                        if (req.method !== 'POST') {
                            res.status(405).json({ error: 'Method not allowed' });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName;
                        if (!email) {
                            res.status(400).json({ error: 'Email is required' });
                            return [2 /*return*/];
                        }
                        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                            res.status(400).json({ error: 'Invalid email format' });
                            return [2 /*return*/];
                        }
                        subscriberData = {
                            email_address: email,
                            status: 'subscribed'
                        };
                        // Add name fields if provided
                        if (firstName || lastName) {
                            subscriberData.merge_fields = {
                                FNAME: firstName || '',
                                LNAME: lastName || ''
                            };
                        }
                        // Add tags for masterclass pre-registration
                        subscriberData.tags = ['masterclass-preregister', 'website-subscriber'];
                        mailchimpUrl = "https://".concat(DATACENTER, ".api.mailchimp.com/3.0/lists/").concat(AUDIENCE_ID, "/members");
                        return [4 /*yield*/, fetch(mailchimpUrl, {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Basic ".concat(Buffer.from("anystring:".concat(MAILCHIMP_API_KEY)).toString('base64')),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(subscriberData)
                            })];
                    case 2:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _b.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        res.status(200).json({
                            success: true,
                            message: 'Successfully subscribed! You\'ll be notified when new masterclasses launch.',
                            email: email
                        });
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(data.title === 'Member Exists')) return [3 /*break*/, 6];
                        crypto_1 = require('crypto');
                        emailHash = crypto_1.createHash('md5').update(email.toLowerCase()).digest('hex');
                        updateUrl = "https://".concat(DATACENTER, ".api.mailchimp.com/3.0/lists/").concat(AUDIENCE_ID, "/members/").concat(emailHash);
                        return [4 /*yield*/, fetch(updateUrl, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': "Basic ".concat(Buffer.from("anystring:".concat(MAILCHIMP_API_KEY)).toString('base64')),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    tags: [
                                        { name: 'masterclass-preregister', status: 'active' }
                                    ]
                                })
                            })];
                    case 5:
                        updateResponse = _b.sent();
                        if (updateResponse.ok) {
                            res.status(200).json({
                                success: true,
                                message: 'You\'re already subscribed! We\'ve updated your preferences for masterclass notifications.',
                                email: email
                            });
                        }
                        else {
                            res.status(400).json({
                                error: 'You\'re already subscribed to our newsletter.'
                            });
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        console.error('Mailchimp API error:', data);
                        res.status(400).json({
                            error: data.detail || 'Failed to subscribe. Please try again.'
                        });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        console.error('Masterclass subscription error:', error_2);
                        res.status(500).json({
                            error: 'Internal server error. Please try again later.'
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// Assessment Completion Function with Follow-up Email
exports.completeAssessment = functions.https.onRequest(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Handle CORS
        (0, cors_1.cors)(req, res, function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, firstName, lastName, assessmentScore, lowestScoringPillar, topRecommendations, emailRegex, subscriberData, mailchimpUrl, response, data, crypto_2, emailHash, updateUrl, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Only allow POST requests
                        if (req.method !== 'POST') {
                            res.status(405).json({ error: 'Method not allowed' });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        _a = req.body, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, assessmentScore = _a.assessmentScore, lowestScoringPillar = _a.lowestScoringPillar, topRecommendations = _a.topRecommendations;
                        if (!email) {
                            res.status(400).json({ error: 'Email is required' });
                            return [2 /*return*/];
                        }
                        emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                            res.status(400).json({ error: 'Invalid email format' });
                            return [2 /*return*/];
                        }
                        subscriberData = {
                            email_address: email,
                            status: 'subscribed',
                            merge_fields: {
                                FNAME: firstName || '',
                                LNAME: lastName || '',
                                ASCORE: assessmentScore || '',
                                LOWPILLAR: lowestScoringPillar || '',
                                TOPRECS: topRecommendations || ''
                            },
                            tags: ['biohacking-assessment-completed', 'assessment-lead', 'masterclass-nurture']
                        };
                        mailchimpUrl = "https://".concat(DATACENTER, ".api.mailchimp.com/3.0/lists/").concat(AUDIENCE_ID, "/members");
                        return [4 /*yield*/, fetch(mailchimpUrl, {
                                method: 'POST',
                                headers: {
                                    'Authorization': "Basic ".concat(Buffer.from("anystring:".concat(MAILCHIMP_API_KEY)).toString('base64')),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(subscriberData)
                            })];
                    case 2:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _b.sent();
                        if (!(response.ok || data.title === 'Member Exists')) return [3 /*break*/, 6];
                        if (!(data.title === 'Member Exists')) return [3 /*break*/, 5];
                        crypto_2 = require('crypto');
                        emailHash = crypto_2.createHash('md5').update(email.toLowerCase()).digest('hex');
                        updateUrl = "https://".concat(DATACENTER, ".api.mailchimp.com/3.0/lists/").concat(AUDIENCE_ID, "/members/").concat(emailHash);
                        return [4 /*yield*/, fetch(updateUrl, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': "Basic ".concat(Buffer.from("anystring:".concat(MAILCHIMP_API_KEY)).toString('base64')),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    merge_fields: subscriberData.merge_fields,
                                    tags: [
                                        { name: 'biohacking-assessment-completed', status: 'active' },
                                        { name: 'assessment-lead', status: 'active' },
                                        { name: 'masterclass-nurture', status: 'active' }
                                    ]
                                })
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        res.status(200).json({
                            success: true,
                            message: 'Assessment completed\! Check your email for your personalised recommendations and masterclass access.',
                            email: email,
                            followUpScheduled: true
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        console.error('Mailchimp API error:', data);
                        res.status(400).json({
                            error: data.detail || 'Failed to process assessment. Please try again.'
                        });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_3 = _b.sent();
                        console.error('Assessment completion error:', error_3);
                        res.status(500).json({
                            error: 'Internal server error. Please try again later.'
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
