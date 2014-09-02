angular.module('directives', [])
// .directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 console.log(attributes);
//                 var reader = new FileReader();
//                 reader.onload = function (loadEvent) {
//                     scope.$apply(function () {
//                         scope.fileread = loadEvent.target.result;
//                     });
//                 }
//                 console.log(reader);
//                 reader.readAsDataURL(changeEvent.target.files[0]);
//             });
//         }
//     }
// }]);
// .directive('formelem', function () {
//   return {
//     restrict: 'A',
//     scope: {
//         blogid: '='
//     },
//     link: function (scope, element, attrs) {
//       var elem = document.getElementById('blogid');  // or this way
//       elem.value = scope.blogid;
//     }
//   }
// })
