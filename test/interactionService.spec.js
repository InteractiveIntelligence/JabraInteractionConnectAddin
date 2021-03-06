describe('InteractionService', function() {
    beforeEach(function() { angular.mock.module('clientaddin'); });

    var InteractionService;

    var IcwsSessionServiceMock = {
        post: function(url, data){}
    };

    var QueueServiceMock = {
        alertingInteraction: function(){},
        connectedCall: function(){}
    };

    beforeEach(function(){

        ININ = {
            Addins:{
                IC:{
                    Interactions:{
                        selectedInteraction:{
                            interactionId: null
                        }
                    }
                }
            }
        }

        module(function($provide){
            $provide.value('QueueService', QueueServiceMock);
            $provide.value('IcwsSessionService', IcwsSessionServiceMock);
        });

        inject(function($rootScope, _InteractionService_){
            rootScope = $rootScope;
            InteractionService = _InteractionService_;
        })
    });

    describe("when calling disconnect selected call", function(){

        it('should call the icws disconnect on the selected call', function(){
            spyOn(QueueServiceMock,'connectedCall').and.returnValue('1234')
            spyOn(IcwsSessionServiceMock, 'post').and.callThrough();

            InteractionService.disconnectConnectedCall();
            expect(IcwsSessionServiceMock.post).toHaveBeenCalledWith('/interactions/1234/disconnect');

        })
    });

    describe("when calling answer alerting call", function(){
        it('should call the icws pickup on the alerting call', function(){
            spyOn(QueueServiceMock, 'alertingInteraction').and.returnValue(1234);
            spyOn(IcwsSessionServiceMock, 'post').and.callThrough();

            InteractionService.answerAlertingCall();
            expect(IcwsSessionServiceMock.post).toHaveBeenCalledWith('/interactions/1234/pickup');

        })
    });
});
