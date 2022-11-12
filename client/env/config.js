// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', 'd6abc7e375990602d28c02d2ed601bcc98f34bac');
});

// Put your campus prefix here
window.CAMPUS = 'rfp';