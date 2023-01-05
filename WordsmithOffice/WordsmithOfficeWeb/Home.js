(function () {
    "use strict";

    var messageBanner;

    // The initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            $("#ret").hide();
            // Initialize the notification mechanism and hide it
            var element = document.querySelector('.MessageBanner');
            messageBanner = new components.MessageBanner(element);
            messageBanner.hideBanner();

            // If not using Word 2016, use fallback logic.
            if (!Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                console.log("Not supported Office version!")
                return;
            }

            loadSampleData();

            $('.Button').click(function () {
                var range;
                var input;
                var ret;
                var id = $(this).attr('id');
                var posturl = "http://localhost:3000/" + id;

                $("#ret").show();

                Word.run(function (context) {                    
                    const doc = context.document;
                    range = doc.getSelection();
                    context.load(range, 'text');
                    return context.sync()
                        .then(function () {
                            input = range.text;                            
                            if (range != undefined && input != undefined) {
                                $.ajax({
                                    type: "POST",
                                    url: posturl,
                                    async: false,
                                    data: { sentence: input },
                                    success: function (response) {
                                        ret = response;                                        
                                    },
                                    error: function (textStatus, errorThrown) {
                                        ret = textStatus.statusText;
                                    },
                                    complete: function () {
                                        $("#ret").hide();
                                    }
                                });                                
                            }
                            //$("#ret").hide();
                        })
                        .then(context.sync())
                        .then(function () {
                            const bbp = context.document.body.paragraphs.getLast().insertParagraph("Wordsmith: ", "After");
                            bbp.font.highlightColor = '#99ccff';
                            bbp.font.bold = true;
                            bbp.font.name = "Times New Roman";

                            const items = ret.split("\n");
                            var ap;
                            $.each(items, function (index, item) {
                                ap = context.document.body.paragraphs.getLast().insertParagraph(item, "After");
                                ap.font.highlightColor = null;
                                ap.font.bold = false;
                                ap.font.italic = true;
                                ap.font.name = "Calibri";
                            });

                            const bp2 = context.document.body.paragraphs.getLast().insertParagraph("", "After");
                            bp2.font.italic = false;

                        }).then(context.sync());

                }).catch(errorHandler);
            });
        });
    }

    function loadSampleData() {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {
            // Create a proxy object for the document body.
            var body = context.document.body;

            // Queue a commmand to clear the contents of the body.
            body.clear();
            // Queue a command to insert text into the end of the Word document body.
            body.insertText(
                "currenttly working on an \"Engine shaft\” project where my objective is to reduce the amplitude of torsional vibrations from single cylinder engine by understanding the dynamics of crank train and modelling it in AMEsim " +
                "to determine the parameters of the system.I have also worked on a[project name]project, where I conducted" +
                "various test including order tracking, Operating Deflection Shapes(ODS) measurement, MIMO modal analysis," +
                "acoustic sound intensity measurement, etc., where we determined the noise and vibrations characteristics of " +
                "the shaft, identifying the sources of noise and vibrations and recommended design changes to mitigate them." +
                "My involvement in FSAE Enterprise at Michigan Tech have played a major role in developing my skills in the " +
                "automotive sector.My work involved design and structural analysis of the chassis components like A - arms and " +
                "other components like brake pedal, harness bar, etc.using ANSYS software.",
                Word.InsertLocation.end);

            // Synchronize the document state by executing the queued commands, and return a promise to indicate task completion.
            return context.sync();
        })
            .catch(errorHandler);
    }
    
    //$$(Helper function for treating errors, $loc_script_taskpane_home_js_comment34$)$$
    function errorHandler(error) {
        // $$(Always be sure to catch any accumulated errors that bubble up from the Word.run execution., $loc_script_taskpane_home_js_comment35$)$$
        showNotification("Error:", error);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notification-header").text(header);
        $("#notification-body").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();
