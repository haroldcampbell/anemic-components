// (function () {
//     'use strict';
//
//     describe("MondayJS Empty Controller Context ", function () {
//         var controller, controllerContext;
//         var mockMessage = "[controller] message";
//
//         beforeEach(function () {
//             controller = $monday.controller("Thin");
//             controller.context.onLoad = function () {
//                 this.message = mockMessage;
//             };
//             /* Allows us to reboot for each test. */
//             $monday.$$isMondayBooted = false;
//             $monday.boot();
//         });
//         it("should be create Controller", function () {
//             expect($monday.controllersByName["Thin"]).toBe(controller);
//             expect(controller.context.$meta).toBe(controller);
//             expect(controller.contexts.length).toBe(1);
//         });
//         it("should be able to access context property", function () {
//             expect(controller.context.message).toBe(mockMessage);
//         });
//     });
//
//     describe("MondayJS Controllers", function () {
//         var controller, controllerContext;
//
//         beforeEach(function () {
//             controllerContext = {};
//
//             controller = $monday.controller("HelloWorld", controllerContext);
//             controllerContext.$options({template: "someUrl.html"});
//             controllerContext.setMessage = function (newMessage) {
//                 this.message = newMessage;
//             }
//         });
//
//         it("should be create Controller", function () {
//             expect($monday.controllersByName["HelloWorld"]).toBe(controller);
//             expect(controllerContext.$meta).toBe(controller);
//         });
//
//         it("should set Controller options", function () {
//             expect(controllerContext.template).toBeDefined();
//             expect(controllerContext.template).toBe("someUrl.html");
//         });
//
//         /**
//          * Controller Features
//          */
//         describe("Controller Features", function () {
//             var mockMessage = "[controller] message";
//
//             beforeEach(function () {
//                 controllerContext.onLoad = function () {
//                     this.message = mockMessage;
//                 };
//                 /* Allows us to reboot for each test. */
//                 $monday.$$isMondayBooted = false;
//                 $monday.boot();
//             });
//
//             it("should be able to access context property", function () {
//                 expect(controllerContext.message).toBe(mockMessage);
//             });
//         });
//
//         /**
//          * Dependency Injection
//          */
//         describe("Dependency Injection", function () {
//             var mockMessage1 = "The weather is good";
//             var mockMessage2 = "Hello you!";
//             var mockMessage3 = "How are you today?";
//             var greetingsService;
//
//             beforeEach(function () {
//                 /* create services */
//                 var weatherService = $monday.service("WeatherService");
//                 greetingsService = $monday.service("GreetingsService");
//
//                 /* define service function */
//                 weatherService.getWeatherForecast = function () {
//                     return mockMessage1;
//                 };
//                 greetingsService.getGreeting = function () {
//                     return mockMessage2;
//                 };
//             });
//
//             beforeEach(function () {
//                 controllerContext.$required("WeatherService", "GreetingsService");
//                 /* onLoad is called automatically by MondayJS#boot */
//                 controllerContext.onLoad = function (svc1, svc2) {
//                     this.weather = svc1.getWeatherForecast();
//                     this.greeting = svc2.getGreeting();
//                 };
//
//                 /* Allows us to reboot for each test. Need for testing only! */
//                 $monday.$$isMondayBooted = false;
//                 $monday.boot();
//             });
//
//             it("should inject dependencies", function () {
//                 expect(controllerContext.weather).toBe(mockMessage1);
//                 expect(controllerContext.greeting).toBe(mockMessage2);
//             });
//
//             it("should trigger dataChanged callbacks", function () {
//                 controllerContext.setMessage('Good morning.');
//
//                 /* define callbacks for controller's context */
//                 controllerContext.anyCallback = function (data) {
//                     this.greetingMessage = this.message + "[" + data + "]";
//                 };
//                 controllerContext.goodByeCallback = function (data) {
//                     this.greetingMessage = this.message + "[" + data + "]";
//                 };
//
//                 /* wiring callbacks */
//                 greetingsService.addCallbacks(controllerContext, {
//                     any: controllerContext.anyCallback,
//                     goodBye: controllerContext.goodByeCallback
//                 });
//
//                 /* data change events */
//                 greetingsService.pushNotification = function () {
//                     this.onChanged({any:'[pushNotification]' + mockMessage3});
//                 };
//                 greetingsService.goodByePushNotification = function () {
//                     this.onChanged({goodBye: '[goodByePushNotification]' + mockMessage3});
//                 };
//
//                 greetingsService.pushNotification();
//                 expect(controllerContext.greetingMessage).toBe('Good morning.[[pushNotification]' + mockMessage3 + ']');
//
//                 greetingsService.goodByePushNotification();
//                 expect(controllerContext.greetingMessage).toBe('Good morning.[[goodByePushNotification]' + mockMessage3 + ']');
//             });
//         });
//     });
// })();
