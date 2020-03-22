// use this to isolate the scope
(function() {

        if(!$axure.document.configuration.showRecordPlay) { return; }

    $(window.document).ready(function() {
        $axure.player.createPluginHost({
            id: 'recordPlayHost',
            context: 'interface',
            title: 'Recording'
        });
        _generateRecordPlay();

        $('#recordButton').click(_recordClick);
        $('#playButton').click(_playClick);
        $('#stopButton').click(_stopClick);
        $('#deleteButton').click(_deleteClick);

        // bind to the page load

        $axure.page.bind('load.page_notes', function() {

            $.ajax({
                type: "POST",
                url: '/RecordController/ListRecordings',
                success: function(response) {

                    $('#recordNameHeader').html("");
                    $('#recordPlayContent').html("");
                    //populate the notes

                    axRecordingList = [];

                    if(!eventList) {
                        recordingIndex = 0;
                        eventList = [];
                        recordingStartTime = 0;
                        bulkEventElement = "";
                        lastBulkEvent = {};
                    }

                    for(const idx in response.recordingList) {
                        getOneRecording(response.recordingList[idx]);
                    }

                    return false;
                },
                //                dataType: 'json'
            });
        });
    });

    const nameMatcher = new RegExp("^axRecording[0-9]{4}$", "i");
    const indexMatcher = new RegExp("[0-9]{4}$", "i");

    const convertFromJson = function(oneRecording) {

        if(nameMatcher.exec(oneRecording.recordingName)) {
            const myArray = indexMatcher.exec(oneRecording.recordingName);
            const currIdx = parseInt(myArray);
            if(recordingIndex < currIdx) {
                recordingIndex = currIdx;
            }
        }


        for(const idx in oneRecording.eventList) {
            const thisEvent = oneRecording.eventList[idx];
                thisEvent.eventInfo = {};
                            thisEvent.eventInfo.srcElement = thisEvent.elementID;
                // TODO: check that this is correct.

            if(isBulkMouse(thisEvent.eventType)) {
                thisEvent.eventInfo.mousePositions = [];
                thisEvent.eventInfo.mousePositions = thisEvent.mousePositions;
                thisEvent.timeStamp = thisEvent.mousePositions[0].timeStamp;
            }
            if(isSingleMouse(thisEvent.eventType)) {
                thisEvent.eventInfo.cursor = {};
                thisEvent.eventInfo.cursor = thisEvent.cursor;

            }
            if(thisEvent.eventType === 'OnDrag') {
                thisEvent.eventInfo.dragInfo = {};
                thisEvent.eventInfo.dragInfo = thisEvent.dragInfo;
                thisEvent.timeStamp = thisEvent.dragInfo.startTime;
            }

        }
        return oneRecording;
    };

    const getOneRecording = function(recordingItem) {
        $.ajax({
                type: "POST",
                url: '/RecordController/GetRecording',
                data: { 'recordingId': recordingItem.recordingId },
            success: function(response) {
                        axRecordingList[axRecordingList.length] = convertFromJson(response);
                        const axRecordingContainer = $('#recordingContainer').find('li').filter('.recordingRootNode');
                        axRecordingContainer.append(_formAxRecordingBranch(response));
                        _attachEventTriggers(response);
            },                //                dataType: 'json'
        });

    };

    const axRecordingList;
    const eventList;
    const recordingIndex;
    const recordingStartTime;
    const recordingId;
    const recordingName;


    const leadingZeros = function(number, digits) { // because this thing doesn't have string.format (or does it?)
        const recurseLeadingZeros = function(number, digitsLeft) {
            if(digitsLeft > 0) {
                return recurseLeadingZeros("0" + number, digitsLeft - 1);
            } else {
                return number;
            }
        };
        return recurseLeadingZeros(number, digits - String(number).length);
    };


    const generateRecordingName = function() {
        return "axRecording" + leadingZeros(recordingIndex, 4);
    };

    const isSingleMouse = function(eventType) {
        return (eventType === 'OnClick' ||
            eventType === 'OnMouseUp' ||
            eventType === 'OnMouseDown' ||
            eventType === 'OnMouseOver' ||
            eventType === 'OnKeyUp' ||
            eventType === 'OnSelectedChange' ||
            eventType === 'OnSelect' ||
            eventType === 'OnUnselect' ||
            eventType === 'OnTextChange' ||
            eventType === 'OnMouseOut');
    };

    const isBulkMouse = function(eventType) {
        return (eventType === 'OnMouseHover' ||
            eventType === 'OnMouseMove');
    };

    const bulkEventElement;
    const lastBulkEvent;


    $axure.messageCenter.addMessageListener(function(message, eventData) {
        const lastEvent, lastBulkData;

        if(message === 'logEvent') {

            if(bulkEventElement !== eventData.elementID) {
                lastBulkEvent = {};
                bulkEventElement = eventData.elementID;
            }

            if(isBulkMouse(eventData.eventType)) {
                lastEvent = lastBulkEvent[eventData.eventType];

                if(lastEvent) {
                    // this is the second or third or whatever onmousemove in a row
                    lastBulkData = lastEvent.eventInfo.mousePositions;
                    lastBulkData[lastBulkData.length] = {
                        cursor: eventData.eventInfo.cursor,
                        timeStamp: eventData.timeStamp
                    };
                } else {

                    eventData.eventInfo.mousePositions = [];
                    eventData.eventInfo.mousePositions[0] = {
                        cursor: eventData.eventInfo.cursor,
                        timeStamp: eventData.timeStamp
                    };
                    eventList[eventList.length] = eventData;
                    lastBulkEvent[eventData.eventType] = eventData;
                }
            } else {
                const z = true;
            }

            if(isSingleMouse(eventData.eventType) ) {
                eventList[eventList.length] = eventData;
                lastBulkEvent = {};
                bulkEventElement = eventData.elementID;
            }

            if(eventData.eventType === 'OnDrag') {

                lastEvent = lastBulkEvent[eventData.eventType];

                if (lastEvent) {
                    // this is the second or third or whatever onmousemove in a row
                    lastBulkData = lastEvent.eventInfo.mousePositions;
                    lastBulkData[lastBulkData.length] = {
                        dragInfo: eventData.eventInfo.dragInfo,
                        timeStamp: eventData.timeStamp
                    };
                } else {
                    eventData.eventInfo.mousePositions = [];
                    eventData.eventInfo.mousePositions[0] = {
                        dragInfo: eventData.eventInfo.dragInfo,
                        timeStamp: eventData.timeStamp
                    };
                    eventList[eventList.length] = eventData;
                    lastBulkEvent[eventData.eventType] = eventData;
                }
            }
//            if(eventData.eventType === 'OnKeyUp') {
//                transmissionFields.eventInfo = eventData.eventInfo;
//                $.ajax({
//                    type: "POST",
//                    url: '/RecordController/LogMouseClick',
//                    data: transmissionFields,
//                });
//            }
        }

    });


    const _recordClick = function(event) {
        $('#recordButton').addClass('recordPlayButtonSelected');
        recordingIndex++;
        //        $axure.recording.startRecord();

        recordingStartTime = new Date().getTime();

        $.ajax({
            type: "POST",
            url: '/RecordController/CreateRecording',
            data: {
                'recordingName': generateRecordingName(),
                timeStamp: recordingStartTime
            },
            success: function(response) {
                recordingId = response.recordingId;
                recordingName = response.recordingName;
        $axure.messageCenter.postMessage('startRecording', {'recordingId' : recordingId, 'recordingName': recordingName});
            },
            //                dataType: 'json'
        });

    };

    const _playClick = function(event) {
        $('#playButton').addClass('recordPlayButtonSelected');
    };

    const _stopClick = function(event) {
        const axRecording, axObjectDictionary, axRecordingContainer, transmissionFields;
        $('#sitemapLinksContainer').toggle();
        if($('#recordButton').is('.recordPlayButtonSelected')) {
            $('#recordButton').removeClass('recordPlayButtonSelected');
            //            $axure.recording.stopRecord();

            axRecording = {
                'recordingId' : recordingId,
                'recordingName': recordingName,
                'eventList': eventList
            };

            axRecordingList[axRecordingList.length] = axRecording;
            axRecordingContainer = $('#recordingContainer').find('li').filter('.recordingRootNode');
            axRecordingContainer.append(_formAxRecordingBranch(axRecording));
            _attachEventTriggers(axRecording);

            lastBulkEvent = {};

            const recordingStepList = [];

            for(const eventListIdx in eventList) {
                const eventListItem = eventList[eventListIdx];

                if(eventListItem.eventType === 'OnDrag') {
                    const lastDrag = eventListItem.eventInfo.mousePositions[eventListItem.eventInfo.mousePositions.length - 1].dragInfo;
                    eventListItem.eventInfo.dragInfo.currentX = lastDrag.currentX;
                    eventListItem.eventInfo.dragInfo.currentY = lastDrag.currentY;
                    eventListItem.eventInfo.dragInfo.currentTime = lastDrag.currentTime;
                    eventListItem.eventInfo.dragInfo.xDelta = eventListItem.eventInfo.dragInfo.currentX - eventListItem.eventInfo.dragInfo.lastX;
                    eventListItem.eventInfo.dragInfo.yDelta = eventListItem.eventInfo.dragInfo.currentY - eventListItem.eventInfo.dragInfo.lastY;
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['dragInfo']);
                    transmissionFields.recordingId = recordingId;
                }

                if(isSingleMouse(eventListItem.eventType)) {
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['timeStamp', 'eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['cursor']);
                    transmissionFields.recordingId = recordingId;
                }

                if(isBulkMouse(eventListItem.eventType)) {
                    transmissionFields = {};
                    transmissionFields = tackItOn(transmissionFields, eventListItem, ['eventType', 'elementID', 'path']);
                    transmissionFields = tackItOn(transmissionFields, eventListItem.eventInfo, ['mousePositions']);
                    transmissionFields.recordingId = recordingId;
                }
                recordingStepList[recordingStepList.length] = transmissionFields;
            }

            eventList = [];
            $axure.messageCenter.postMessage('stopRecording', axObjectDictionary);

            const jsonText = {
                'recordingName': recordingName,
                'recordingId': recordingId,
                recordingStart: new Date().getTime(),
                recordingEnd: recordingStartTime,
                'eventList': recordingStepList
            };

            $.ajax({
                type: "POST",
                url: '/RecordController/StopRecording',
                data: { 'jsonText': JSON.stringify(jsonText) }

            });

        }

        if($('#playButton').is('.recordPlayButtonSelected')) {
            $('#playButton').removeClass('recordPlayButtonSelected');
        }
    };

    const _deleteClick = function(event) {
        $.ajax({
                type: "POST",
                url: '/RecordController/DeleteRecordings',
            success: function(response) {
                const x = true;
            },                //                dataType: 'json'
        });
    };

    const tackItOn = function(destination, source, fields) {

        for(const idx in fields) {
            destination[fields[idx]] = source[fields[idx]];
        }
        return destination;
    };

    const makeFirstLetterLower = function(eventName) {
        return eventName.substr(0, 1).toLowerCase() + eventName.substr(1);
    };

    const _attachEventTriggers = function(axRecording) {
        for(const eventIdx in axRecording.eventList) {
            const eventObject = axRecording.eventList[eventIdx];
            const eventID = axRecording['recordingId'] + '_' + eventObject.timeStamp;
            currentEvent = eventID;
            $('#' + eventID).click(_triggerEvent(axRecording['recordingId'], eventObject.timeStamp));
            //            $('#' + eventID).click(event.trigger);
        }
    };

    const _formAxRecordingBranch = function(axRecording) {
        const eventObject, eventID, RDOID;
        const recordPlayUi = '<ul class="recordingTree">';
        recordPlayUi += "<li class='recordingNode recordingExpandableNode'>";
        recordPlayUi += '<div class="recordingContainer" style="margin-left:15px">';
        recordPlayUi += '<a class="recordingPlusMinusLink"><span class="recordingMinus"></span></a>';
        recordPlayUi += '<a class="recordingPageLink" nodeurl="home.html">';
        recordPlayUi += '<span class="recordingPageIcon"></span>';
        recordPlayUi += '<span class="recordingPageName">' + axRecording['recordingName'] + '</span>';
        recordPlayUi += '</a>';

        recordPlayUi += '<ul>';

        for(eventID in axRecording.eventList) {

            eventObject = axRecording.eventList[eventID];

            recordPlayUi += '<li class="recordingNode recordingLeafNode">';
            recordPlayUi += '<div class="recordingEventContainer" style="margin-left:44px">';
            const eventID = axRecording['recordingId'] + '_' + eventObject.timeStamp;
            recordPlayUi += '<a id="' + eventID + '" class="sitemapPageLink">';
            recordPlayUi += 'Event ID: ' + eventID + '<br/>';

            recordPlayUi += '<span class="sitemapPageIcon"></span>';
            recordPlayUi += '<span class="sitemapPageName">';

            recordPlayUi += 'elementID: ' + eventObject.elementID + '<br/>';
            recordPlayUi += 'eventType: ' + eventObject.eventType + '<br/>';
//            recordPlayUi += 'cursor: ' + eventObject.eventInfo.cursor.x + ',' + eventObject.eventInfo.cursor.y + '<br/>';

            for(RDOID in eventObject.path) {
                recordPlayUi += '/' + eventObject.path[RDOID];
            }
            recordPlayUi += '<br/>';
            recordPlayUi += '</span>';
            recordPlayUi += '</a>';
            recordPlayUi += '</div>';
            recordPlayUi += '</li>';
        }

        recordPlayUi += '</ul>';

        recordPlayUi += '</div>';

        recordPlayUi += "</li>";
        recordPlayUi += "</ul>";

        return recordPlayUi;
    };

    const currentEvent = '';

    const _triggerEvent = function(axRecording, timeStamp) {
        //            $axure.messageCenter.postMessage('triggerEvent', false);


        for(const axRecordingIdx in axRecordingList) {
            if(axRecordingList[axRecordingIdx].recordingId === axRecording) {
                for(const eventIdx in axRecordingList[axRecordingIdx].eventList) {
                    if(axRecordingList[axRecordingIdx].eventList[eventIdx].timeStamp === timeStamp) {

                        const thisEvent = axRecordingList[axRecordingIdx].eventList[eventIdx];
                        //                            thisEvent.trigger();

                        const thisEventInfo, lowerEventType;
                        lowerEventType = thisEvent.eventType.toLowerCase();
                        if(lowerEventType === 'onclick' || lowerEventType === 'onmousein') {
                            thisEventInfo = {};
                            thisEventInfo = tackItOn(thisEventInfo, thisEvent.eventInfo, ['cursor', 'timeStamp', 'srcElement']);
                            if(thisEvent.eventInfo.inputType) {
                                thisEventInfo = tackItOn(thisEventInfo, thisEvent.eventInfo, ['inputType', 'inputValue']);
                            }
                        } else {
                            thisEventInfo = thisEvent.eventInfo;
                        }

                        const thisParameters = {
                            'element': thisEvent.elementID,
                            'eventInfo': thisEventInfo,
                            //                            'axEventObject': thisEvent.eventObject,
                            'eventType': thisEvent.eventType
                        };

                        return function() {
                            $axure.messageCenter.postMessage('playEvent', thisParameters);
                        };

                    }
                }
            }
        }
    };

    const _generateRecordPlay = function() {
        const recordPlayUi = "<div id='recordPlayContainer'>";

        recordPlayUi += "<div id='recordPlayToolbar'>";

        recordPlayUi += "<div style='height:30px;'>";

        recordPlayUi += "<a id='recordButton' title='Start a Recording' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='playButton' title='Play Back a Recording' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='stopButton' title='Stop' class='recordPlayButton'></a>";
        recordPlayUi += "<a id='deleteButton' title='Delete All Recordings' class='recordPlayButton'></a>";
        recordPlayUi += "</div>";

        recordPlayUi += "<div id='recordingContainer'><li class='recordingNode recordingRootNode'></li></div>";
        recordPlayUi += "</div>";

        $('#recordPlayHost').html(recordPlayUi);
    };

})();
