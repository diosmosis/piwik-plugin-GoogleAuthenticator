/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

angular.module('piwikApp').controller('GoogleAuthenticatorSettings', function ($scope, $timeout) {

    $scope.gasecret = '';
    $scope.gatitle = '';
    $scope.description = '';

    $scope.showQRCode = function() {
        var urlencoded = encodeURI('otpauth://totp/'+ $scope.description + '?secret=' + $scope.gasecret);
        if($scope.gatitle) {
            urlencoded += encodeURIComponent('&issuer=' + encodeURIComponent($scope.gatitle).replace(/%20/g,'+'));
        }

        $('.qrcode').attr('src', 'index.php?module=GoogleAuthenticator&action=showQrCode&data=' + urlencoded);
    };

    $scope.$watchGroup(['gatitle', 'description'], function(newValues, oldValues, scope) {
        scope.showQRCode();
    });

    $timeout(function() {
        $scope.showQRCode()
    }, 250);
});