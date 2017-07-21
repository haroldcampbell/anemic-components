// (function () {
//     'use strict';
//
//     describe("MondayJS Inline Service", function () {
//         var service;
//         var serviceName = "WeatherService";
//         var injService;
//
//         beforeEach(function () {
//             service = $monday.service(serviceName, function(){
//                 this.isItHot = function () {
//                     this.message = "Today is going to be sunny!";
//                 };
//             });
//
//             injService = $monday.getServiveByName(serviceName);
//         });
//         it("should be able to get singleton by name", function () {
//             expect(injService).toBe(service);
//         });
//         it("should be able access updated singleton properties", function () {
//             injService.isItHot();
//             expect(injService.message).toBe("Today is going to be sunny!");
//         });
//     });
//
//     describe("MondayJS Block Services", function () {
//         var service;
//         var serviceName = "WeatherService";
//
//         beforeEach(function () {
//             service = $monday.service(serviceName);
//         });
//
//         /**
//          * Access Singleton Service
//          */
//         describe("Access Singleton Service", function () {
//
//             /* Service found by lookup or injection */
//             var injService;
//             var mockServiceMsg = "[Service] Today is going to be sunny!";
//
//             beforeEach(function () {
//                 service.serviceWeatherForecast = function () {
//                     this.message = mockServiceMsg;
//
//                     return this.message;
//                 };
//                 injService = $monday.getServiveByName(serviceName);
//             });
//
//             it("should be able to get singleton by name", function () {
//                 expect(injService).toBe(service);
//             });
//             it("should be able to call singleton method", function () {
//                 expect(injService.serviceWeatherForecast()).toBe(mockServiceMsg);
//             });
//             it("should be able access updated singleton properties", function () {
//                 injService.serviceWeatherForecast();
//                 expect(injService.message).toBe(mockServiceMsg);
//             });
//         });
//
//         /**
//          * Access Service Context
//          */
//          describe("Access Service Context", function () {
//             var injService;
//             var serviceContext;
//             var mockContextMsg = "Today is going to be sunny!";
//
//             beforeEach(function () {
//                 serviceContext = {
//                     newData: null,
//                     weatherChangedCallback: function (data) {
//                         this.newData = data;
//                         this.contextWeatherForecast();
//                     },
//                     getMessage: function() {
//                         return this.message;
//                     },
//                     contextWeatherForecast: function () {
//                         this.message = mockContextMsg + "[" + this.newData + "]";
//                     }
//                 };
//
//                 /* set an initial value for a property. */
//                 serviceContext.message = mockContextMsg;
//
//                 /* Reset the $$contextCallbacks for each test. */
//                 $monday._purgeServiceCallbacks(serviceName);
//
//                 injService = $monday.service(serviceName);
//                 injService.addCallbacks(serviceContext, {
//                     any:serviceContext.weatherChangedCallback
//                 });
//             });
//
//             it("should be context callback", function () {
//                 expect(injService.$$contextCallbacks.length).toBe(1);
//             });
//             it("should be able access updated context properties", function () {
//                 var data = "very sunny";
//
//                 expect(serviceContext.getMessage()).toBe(mockContextMsg);
//                 injService.onChanged({any: data});
//                 expect(serviceContext.getMessage()).toBe(mockContextMsg + "[" + data + "]");
//             });
//         });
//     });
// })();
