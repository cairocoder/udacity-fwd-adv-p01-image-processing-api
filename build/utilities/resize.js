"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var JPEG_1 = __importDefault(require("./JPEG"));
var PNG_1 = __importDefault(require("./PNG"));
var resize = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var image_name, image_width, image_height, fileFormat, fileExtension, image_path, new_image_name, new_image_directory, new_image_path, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Check endpoint URL.
                if (req.query.filename === undefined ||
                    req.query.width === undefined ||
                    req.query.height === undefined) {
                    res.send("Oops: Please double check your endpoint URL.");
                    return [2 /*return*/];
                }
                image_name = req.query.filename;
                image_width = parseInt(req.query.width);
                image_height = parseInt(req.query.height);
                fileFormat = req.query.format;
                fileExtension = '.' + fileFormat;
                // set JPEG as default image format.
                if (fileFormat === undefined) {
                    fileFormat = 'jpeg';
                    fileExtension = '.jpg';
                }
                image_path = path_1.default.join(__dirname + '../../../images/full/' + image_name + fileExtension);
                if (isNaN(image_width) || isNaN(image_height)) {
                    res.send("Error: Please enter valid number for width and height");
                    return [2 /*return*/];
                }
                new_image_name = image_name + image_width + image_height + fileExtension;
                new_image_directory = path_1.default.join(__dirname + '../../../images/thumb/');
                new_image_path = new_image_directory + new_image_name;
                console.log(new_image_path);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                // Check if the requested image exist
                try {
                    fs_1.default.accessSync(image_path, fs_1.default.constants.F_OK);
                    console.log("Requested image already exist.");
                }
                catch (err) {
                    res.send("Requested image not exist.");
                    return [2 /*return*/];
                }
                // Check if the resized version of requested image exist
                try {
                    fs_1.default.accessSync(new_image_path, fs_1.default.constants.F_OK);
                    // Return the full path of the resized version
                    console.log("Resized image exist.");
                    res.sendFile(new_image_path);
                    return [2 /*return*/];
                }
                catch (err) {
                    console.log("There's no resized version of this image.");
                }
                // Create the 'thumb' folder if it's not exist
                try {
                    fs_1.default.accessSync(new_image_directory, fs_1.default.constants.F_OK);
                    console.log("'thumb' folder already exist.");
                }
                catch (err) {
                    try {
                        fs_1.default.mkdirSync(new_image_directory);
                    }
                    catch (err) {
                        res.send("Failed to creeate 'thumb' folder'");
                        return [2 /*return*/];
                    }
                }
                // Start resizing requested image
                console.log("Start resizing, with format : ".concat(fileFormat));
                if (!(fileFormat === 'jpeg')) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, JPEG_1.default)(image_path, image_width, image_height, new_image_path)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!(fileFormat === 'png')) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, PNG_1.default)(image_path, image_width, image_height, new_image_path)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                // Return the full path of the resized image
                res.sendFile(new_image_path);
                return [2 /*return*/];
            case 6:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = resize;
