//Daniel Joo July 23, 2018

window.onload = function () {

    //Global boolean variables to control start up animations
    var onExperiences = false;
    var onSkills = false;
    var onProjects = false;
    var onAdditional = false;
    var onContact = false;

    //Global variables representing DOM elements
    //var introTitleElem = document.getElementById('introduction-title');
    var resumeElem = document.getElementById('resume-container');
    var introElem = document.getElementById('intro-content');
    var expElem = document.getElementById('exp-content');
    var skillElem = document.getElementById('skills-content');
    var projElem = document.getElementById('projects-content');
    var addElem = document.getElementById('additional-content');
    var contactElem = document.getElementById('contact-content');

    var bodyElem = document.getElementsByTagName('body')[0];

    //Layer tracker (for transition effect)
    var prev = introElem;
    var prevButton = "";

    //Mouse Speed Tracker
    var refreshTime = 100;
    var lastmouseX = -1;
    var lastmouseY = -1;
    var mouseDistance = 0;
    var lastmouseTime;

    function mouseSpeed(e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        if (lastmouseX > -1)
            mouseDistance += Math.max(Math.abs(mouseX - lastmouseX), Math.abs(mouseY - lastmouseY));
        lastmouseX = mouseX;
        lastmouseY = mouseY;
    }


    //Function that actually changes the layers
    function changeLayer(layer, button) {
        if (layer === prev) return;
        layer.style.zIndex = "60";
        layer.style.cssText = "opacity: 1; transition: opacity 0.5s";
        prev.style.zIndex = "5";
        prev.style.opacity = "0";
        layer.style.zIndex = "50";
        prev = layer;
        if (prevButton !== "") prevButton.style.textDecoration = "none";
        button.style.textDecoration = "underline";
        prevButton = button;
    }

    //Set up introduction page
    var signature = document.getElementById('signature-video');
    adjustOverflow();
    resumeElem.style.zIndex = "10";
    resumeElem.style.opacity = "1";
    introElem.style.opacity = "1";
    resumeElem.style.transition = "opacity 0.7s";
    introElem.style.transition = "opacity 0.7s";
    bodyElem.style.background = "#FF9700";
    signature.play();


    //Scroll function
    function adjustOverflow() {
        bodyElem.style.overflow = "hidden";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


    //EXPERIENCE CONTENT
    var slidePosition = 0;
    var slideWidth = document.getElementsByClassName('slide')[0].clientWidth;
    var slideNum = document.getElementsByClassName('slide').length - 2;
    var slideContainer = document.getElementsByClassName("slide-container")[0];

    function activateSlideShow() {
        $('#exp-content .fa-chevron-right').unbind().click(function() {
            slideWidth = document.getElementsByClassName('slide')[0].clientWidth;
            slideContainer = document.getElementsByClassName("slide-container")[0];
            if (slidePosition >= -(slideNum * slideWidth)) slidePosition -= slideWidth;
            if (slidePosition <= -(slideNum * slideWidth)) {
                this.onclick = function(event) {
                    event.preventDefault();
                }
            }
            slideContainer.style.left = slidePosition + "px";
        });
        $('#exp-content .fa-chevron-left').unbind().click(function() {
            slideWidth = document.getElementsByClassName('slide')[0].clientWidth;
            slideContainer = document.getElementsByClassName("slide-container")[0];
            if (slidePosition < -750) slidePosition += slideWidth;
            if (slidePosition >= -750) {
                //this.style.opacity = "0";
                this.onclick = function(event) {
                    event.preventDefault();
                }
            }
            slideContainer.style.left = slidePosition + "px";
        });
    }

    //SKILLS CONTENT

    //Animate shadow of text to follow mouse movement
    const textBackground = document.getElementById('skills-content');
    const skillH1 = document.querySelector('#skill-intro-container h1');

    function mouseShadow(e) {
        const {offsetWidth: width, offsetHeight: height} = textBackground;
        let {offsetX: x, offsetY: y} = e;

        if (this !== e.target) {
            x = x + e.target.offsetLeft;
            y = y + e.target.offsetTop;
        }

        const movement = 50;
        const xMovement = (x / width * movement) - (movement / 2);
        const yMovement = (y / width * movement) - (movement / 2);

        skillH1.style.textShadow = `${xMovement}px ${yMovement}px 0 #463954`;
    }

    textBackground.addEventListener('mousemove', mouseShadow);

    //Animates bar graph for skill level
    function barAnimation() {
        $('.skill-beginner').css({"width": "12.5%", "opacity": "1", "transition": "width 1.2s, opacity 0.3s"});
        $('.skill-elementary').css({"width": "37.5%", "opacity": "1", "transition": "width 1.2s, opacity 0.3s"});
        $('.skill-intermediate').css({"width": "62.5%", "opacity": "1", "transition": "width 1.2s, opacity 0.3s"});
        $('.skill-advanced').css({"width": "87.5%", "opacity": "1", "transition": "width 1.2s, opacity 0.3s"});
    }

    //Resest bar graph animation
    function resetBarAnimation(animationFlag) {
        $('.skill-beginner').css({"width": "0%", "opacity": "0", "transition": "width 0.5s, opacity 0.3s"});
        $('.skill-elementary').css({"width": "0%", "opacity": "0", "transition": "width 0.5s, opacity 0.3s"});
        $('.skill-intermediate').css({"width": "0%", "opacity": "0", "transition": "width 0.5s, opacity 0.3s"});
        $('.skill-advanced').css({"width": "0%", "opacity": "0", "transition": "width 0.5s, opacity 0.3s"});
    }

    //Layer change according to skill category selection
    function skillLayerChange() {
        var prevSkill = 0;
        $('#skills-nav li:nth-of-type(1) a').click(function () {
            if (prevSkill !== 1) resetBarAnimation();
            $('#skill-intro, #software-list, #software-measurement, #other-list, #other-measurement').css({
                "opacity": "0", "transition": "opacity 0.3s"
            });
            $('#code-skill, #code-list, .skill-measurement, #code-measurement').css({
                "opacity": "1", "transition": "opacity 0.3s"
            });
            setTimeout(barAnimation, 400);
            prevSkill = 1;
        });
        $('#skills-nav li:nth-of-type(2) a').click(function () {
            if (prevSkill !== 2) resetBarAnimation();
            $('#skill-intro, #code-list, #code-measurement, #other-list, #other-measurement').css({
                "opacity": "0", "transition": "opacity 0.3s"
            });
            $('#software-skill, #software-list, .skill-measurement, #software-measurement').css({
                "opacity": "1", "transition": "opacity 0.3s"
            });
            setTimeout(barAnimation, 400);
            prevSkill = 2;
        });
        $('#skills-nav li:nth-of-type(3) a').click(function () {
            if (prevSkill !== 3) resetBarAnimation();
            $('#skill-intro, #code-list, #code-measurement, #software-list, #software-measurement').css({
                "opacity": "0", "transition": "opacity 0.3s"
            });
            $('#other-skill, #other-list, .skill-measurement, #other-measurement').css({
                "opacity": "1", "transition": "opacity 0.3s"
            });
            setTimeout(barAnimation, 400);
            prevSkill = 3;
        });
    }


    //PROJECT CONTENT

    //Reveals the projects
    function revealProject() {
        var projectNode = document.getElementsByClassName('project-node');
        var projectDes = document.getElementsByClassName('project-description');
        var time = 700;
        for (let projIndex = 0; projIndex < projectNode.length; ++projIndex) {
            setTimeout(function() {
                projectNode[projIndex].style.cssText = "opacity: 1; transition: 0.7s opacity";
            }, time);
            projectNode[projIndex].onmouseenter = function() {
                projectDes[projIndex].style.clientWidth = "380px";
                projectDes[projIndex].style.cssText = "opacity: 1; transition: 0.5s opacity";
            }
            projectNode[projIndex].onmouseleave = function() {
                projectDes[projIndex].style.clientWidth = "380px";
                projectDes[projIndex].style.cssText = "opacity: 0; transition: 0.5s opacity";
            }
        }
    }


    //ADDITIONAL CONTENT
    //Font size adaptor according to length of string
    function fontSizeAdaptor(string, elem) {
        var length = string.length;
        if (length > 7) {
            elem.style.fontSize = 10 / (Math.log(length) / Math.log(3.2)) + "vw";
        } else {
            elem.style.fontSize = "10vw";
        }
    }

    //Toggle words in fill in the blanks for sentences
    function loveWordToggle() {
        var loveArray = ["MUSIC", "CREATING", "READABLE CODE", "DOGS", "QUENTIN TARANTINO", "GAME DEVELOPMENT",
            "RAMEN", "COLLABORATION", "CHRISTOPHER NOLAN", "JQUERY", "PYOTR TCHAIKOVSKY", "VANCOUVER, CANADA",
            "FRONT-END DEVELOPMENT", "READABLE CODE", "DESIGN", "CARBONARA", "SEOUL, SOUTH KOREA", "COOKING", "SUNSETS",
            "CHRISTMAS", "FLUME (MUSICIAN)", "CONCERTS"];
        var loveButton = document.getElementById('love-button');
        var blankSpace = document.getElementById('love-container').getElementsByTagName('h4')[0];
        var index = 0;
        loveButton.onclick = function () {
            if (index >= loveArray.length) index = 0;
            blankSpace.innerHTML = "";
            fontSizeAdaptor(loveArray[index], blankSpace);
            blankSpace.textContent = loveArray[index];
            ++index;
        };
    }

    function hateWordToggle() {
        var hateArray = ["CODE BUGS", "OKRA", "PIZZA HUT", "ZARA (RETAILER)", "UNBALANCED TREES", "FUR CLOTHING",
            "KIWI FRUITS", "SLOW WALKERS", "S.A.T.", "EXAMS", "WOLFGANG AMADAEUS MOZART", "CENTIPEDES",
            "HAVING PLANS CANCELED", "WEEDER COURSES", "NOT RECYCLING", "BAD DESIGN", "DISCRIMINATION", ""];
        var hateButton = document.getElementById('hate-button');
        var blankSpace = document.getElementById('hate-container').getElementsByTagName('h4')[0];
        var index = 0;
        hateButton.onclick = function () {
            if (index >= hateArray.length) index = 0;
            blankSpace.innerHTML = "";
            fontSizeAdaptor(hateArray[index], blankSpace);
            blankSpace.textContent = hateArray[index];
            ++index;
        };

    }

    function wonWordToggle() {
        var wonArray = ["1ST IN SCHOOL FOR THE UNIVERSITY OF WATERLOO'S CEMC MATH CONTEST 2014",
            "1ST PLACE AT THE KIWANIS MUSIC FESTIVAL IN VIOLIN (2012, 2013)", "TO BE CONCERTMASTER OF VANCOUVER YOUTH " +
            "SYMPHONY ORCHESTRA", "BRONZE CROSS LIFEGUARDING CERTIFICATE",
            "TO DIRECT AN INDEPENDENT STUDENT FILM", "3RD PLACE FOR BEST SHORT FILM AT THE BRITISH COLUMBIA " +
            "YOUTH FILM FESTIVAL", "1ST PLACE FOR BEST ORIGINAL SOUNDTRACK AT THE BRITISH COLUMBIA YOUTH FILM FESTIVAL",
            "TOP 3% IN THE PROVINCE FOR UNIVERSITY OF BRITISH COLUMBIA'S MICHAEL SMITH SCIENCE CHALLENGE 2014",
            "PRINCIPAL'S LIST AWARD (ABOVE 90% AVERAGE IN HS)", "SKI INSTRUCTOR CERTIFICATE (CSIA)"
        ];
        var wonButton = document.getElementById('won-button');
        var blankSpace = document.getElementById('won-container').getElementsByTagName('h4')[0];
        var index = 0;
        wonButton.onclick = function () {
            if (index >= wonArray.length) index = 0;
            blankSpace.innerHTML = "";
            fontSizeAdaptor(wonArray[index], blankSpace);
            blankSpace.textContent = wonArray[index];
            ++index;
        };
    }

    function makeWordToggle() {
        var makeArray = ["MUSIC", "READABLE CODE", "CARBONARA", "SHORT FILMS", "PHOTOS", "STUDENT DEBT", "SOFTWARE",
        "WEBSITES", "WEBSITE TEMPLATES", "SHORT STORIES", "STIR-FRY", "TIME TO RELAX", "PLANS AND KEEP THEM",
        "CRAZY COCKTAIL CONCOCTIONS", "IT ON TIME TO CLASS", "SURE TO START PROJECTS EARLY",
            "SURE TO TURN OFF THE GAS BEFORE I LEAVE THE HOUSE", "SURE TO PAY ATTENTION TO DETAILS"];
        var makeButton = document.getElementById('make-button');
        var blankSpace = document.getElementById('make-container').getElementsByTagName('h4')[0];
        var index = 0;
        makeButton.onclick = function () {
            if (index >= makeArray.length) index = 0;
            blankSpace.innerHTML = "";
            fontSizeAdaptor(makeArray[index], blankSpace);
            blankSpace.textContent = makeArray[index];
            ++index;
        };
    }

    //Change Additional Layers
    function additionalLayerControl() {
        var $loveLayer = $('#additional-love');
        var $hateLayer = $('#additional-hate');
        var $wonLayer = $('#additional-won');
        var $makeLayer = $('#additional-make');

        $('#additional-quad #additional-1').click(function () {
            $loveLayer.css('z-index', 5);
            setTimeout(function () {
                $loveLayer.css({"opacity": "1", "transition": "opacity 0.5s"});
            }, 100);
            loveWordToggle();
            $('#additional-love .fa-times').click(function () {
                $loveLayer.css({"opacity": "0", "transition": "opacity 0.5s"});
                setTimeout(function () {
                    $loveLayer.css('z-index', -5);
                }, 500);
            });
        });

        $('#additional-quad #additional-2').click(function () {
            $hateLayer.css('z-index', 5);
            setTimeout(function () {
                $hateLayer.css({"opacity": "1", "transition": "opacity 0.5s"});
            }, 100);
            hateWordToggle();
            $('#additional-hate .fa-times').click(function () {
                $hateLayer.css({"opacity": "0", "transition": "opacity 0.5s"});
                setTimeout(function () {
                    $hateLayer.css('z-index', -5);
                }, 500);
            });
        });

        $('#additional-quad #additional-3').click(function () {
            $wonLayer.css('z-index', 5);
            setTimeout(function () {
                $wonLayer.css({"opacity": "1", "transition": "opacity 0.5s"});
            }, 100);
            wonWordToggle();
            $('#additional-won .fa-times').click(function () {
                $wonLayer.css({"opacity": "0", "transition": "opacity 0.5s"});
                setTimeout(function () {
                    $wonLayer.css('z-index', -5);
                }, 500);
            });
        });

        $('#additional-quad #additional-4').click(function () {
            $makeLayer.css('z-index', 5);
            setTimeout(function () {
                $makeLayer.css({"opacity": "1", "transition": "opacity 0.5s"});
            }, 100);
            makeWordToggle();
            $('#additional-make .fa-times').click(function () {
                $makeLayer.css({"opacity": "0", "transition": "opacity 0.5s"});
                setTimeout(function () {
                    $makeLayer.css('z-index', -5);
                }, 500);
            });
        });
    }




    //CONTACT CONTENT

    var $plane = $('#contact-form .fa-paper-plane');
    var $submitButton = $('#contact-form button');

    //Animate opacity of labels from 0 to 1, from top to bottom
    function contactOpacityAnimation() {
        $('#contact-form label:nth-of-type(1)').css({"opacity": "1", "transition": "opacity 0.3s"});
        setTimeout(function () {
            $('#contact-form label:nth-of-type(2)').css({"opacity": "1", "transition": "opacity 0.3s"});
        }, 270);
        setTimeout(function () {
            $('#contact-form label:nth-of-type(3)').css({"opacity": "1", "transition": "opacity 0.3s"});
        }, 540);
        setTimeout(function () {
            $('#contact-form label:nth-of-type(4)').css({"opacity": "1", "transition": "opacity 0.3s"});
        }, 810);
    }

    //upon opening, make input areas expand from 0 px (animate)
    function contactWidthAnimation() {
        setTimeout(function () {
            $('#contact-form input, #contact-form select, #contact-form textarea').css({
                "width": "100%", "opacity": "1", "transition": "width 1s, opacity 1s"
            });
        }, 900);
    }

    //execute button animation after the input animations finish
    function contactButtonAnimation() {
        setTimeout(function() {
            $submitButton.css({
                "opacity": "1", "transition": "opacity 1s"
            });
        }, 1000);
        $submitButton.mouseover(function () {
            this.style.cssText = "cursor: pointer; background-color: #eaeeff; " +
                "opacity: 1; transition: background-color 0.3s;";
            $plane.css({"color": "#5982a0", "transition": "color 0.3s"});
        });
        $submitButton.mouseout(function () {
            this.style.cssText = "cursor: normal; background-color: #5982a0; " +
                "opacity: 1; transition: background-color 0.3s";
            $plane.css({"color": "#eaeeff", "transition": "color 0.3s"});
        });
        $submitButton.click(function() {
            alert('Your message has been sent! I will get back to you as soon as possible.');
        });
    }

    function footerTextAnimation() {
        setTimeout(function() {
            $('#contact-content p:nth-of-type(1)').css({
                "opacity": "1", "transition": "opacity 1s"
            });
        }, 1500);
        setTimeout(function() {
            $('#contact-content p:nth-of-type(2)').css({
                "opacity": "1", "transition": "opacity 1s"
            });
        }, 2000);
    }

    function backToIntro() {
        bodyElem.style.background = "#FF9700";
        adjustOverflow();
        $('#back-to-intro').click(function() {
            changeLayer(introElem);
        });
    }

    //Manage z-index of different components of the resume and reveal them accordingly
    $('#nav-experiences').click(function () {
        bodyElem.style.background = "#B85865";
        adjustOverflow();
        changeLayer(expElem, this);
        activateSlideShow();
        onExperiences = true;
    });
    $('#nav-skills').click(function () {
        bodyElem.style.background = "#9F9DC5";
        adjustOverflow();
        changeLayer(skillElem, this);
        skillLayerChange();
        onSkills = true;
    });
    $('#nav-projects').click(function () {
        bodyElem.style.background = "#7184AB";
        bodyElem.style.overflow = "scroll";
        changeLayer(projElem, this);
        revealProject();
        onProjects = true;
    });
    $('#nav-additional').click(function () {
        bodyElem.style.background = "#8C9B7C";
        adjustOverflow();
        changeLayer(addElem, this);
        additionalLayerControl();
        onAdditional = true;
    });
    $('#nav-contact').click(function () {
        bodyElem.style.background = "#99B3BD";
        adjustOverflow();
        changeLayer(contactElem, this);
        if (!onContact) {
            contactOpacityAnimation();
            contactWidthAnimation();
            contactButtonAnimation();
            footerTextAnimation();
        }
        onContact = true;
        backToIntro();
    });


};
