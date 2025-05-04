const theme = "space";
const total_images = 10;
let custom_img;
let resource_available = false;
const links = [
	{
		name: "Chatgpt",
		url: "https://chatgpt.com",
	},
	{
		name: "Youtube",
		url: "https://www.youtube.com",
	},
	{
		name: "Gorib",
		url: "https://gorib.site",
	},
	{
		name: "Mail",
		url: "https://mail.google.com",
	},
	{
		name: "It's Me",
		url: "https://mdraihanhasan.info",
	},
	
];
let stored_links = JSON.parse(localStorage.getItem("shortcuts"));
let shortcut_data = stored_links !== null ? stored_links : links;
let remove_link_button;
let create_shortcut;

// Video arka plan ayarı
const videoUrl = "img/bg.mp4";

// Video elementini oluştur ve arka plana ekle
$(document).ready(function () {
    const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
    videoElement.attr('src', videoUrl);
    $('body').prepend(videoElement);
    
    // Diğer işlemler burada devam eder (kısayollar, saat, arama işlevi)
});

// Run after the page is loaded
$(document).ready(function () {
	const sw = screen.width;
	const scale = sw / 1920;
	$("body").css("--scale", scale);
	const bg_mode_toggle = $("#bgModeToggle");
	const img_mode = $("#imgMode");
	const add_custom = $("#addCustom");
	const remove_custom = $("#removeCustom");
	const search_trigger = $("#searchTrigger");
	const search_input = $("#searchInput");
	const voice_search = $("#voiceSearch");
	// Initialize the clock
	activateClock();
	// Initialize the shortcuts
	createShortcuts();
	// Initialize the background
	
    function setBackground() {
        // Video element handling
        const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
        videoElement.attr('src', videoUrl);

        // Ensure no image background is applied
        $("body").css("--img", "");
        
        // Adding video to the body if not already added
        if ($("#bgVdo").length === 0) {
            $("body").prepend(videoElement);
        }
    }
    setBackground();
    

	// Handle the search
	search_input.keyup((e) => {
    if (e.keyCode === 13) {
        search_trigger.click();
    }
});

search_trigger.click(() => {
    const searchQuery = search_input.val();
    if (searchQuery != "") {
        chrome.search.query({ text: searchQuery }, function(results) {
            if (results && results.length > 0) { 
                window.location.href = results[0].url; 
            } 
        });
    } else {
        search_input.attr("placeholder", "Enter something to search");
        setTimeout(() => {
            search_input.attr("placeholder", "Search");
        }, 2000);
    }
});

	// Handle the background mode
	bg_mode_toggle.click(() => {
		if (bg_mode == "img") {
			bg_mode = "img";
			localStorage.setItem("bgMode", "img");
			
    function setBackground() {
        // Video element handling
        const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
        videoElement.attr('src', videoUrl);

        // Ensure no image background is applied
        $("body").css("--img", "");
        
        // Adding video to the body if not already added
        if ($("#bgVdo").length === 0) {
            $("body").prepend(videoElement);
        }
    }
    setBackground();
    
		}
	});

	// Handle the custom background upload
	add_custom.click(async () => {
		const file_input = $('<input type="file" accept="image/*" />');
		file_input.trigger("click");
		file_input.change(() => {
			const file = file_input[0].files[0];
			const file_type = file.type;
			const file_size = file.size;
			// max file size is 5MB
			if (file_size > 3500000) {
				alert("File size is too big. Maximum file size is 3MB.");
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				if (file_type.includes("image")) {
					custom_img = reader.result;
					localStorage.setItem("customImg", reader.result);
					img = getImage();
					
    function setBackground() {
        // Video element handling
        const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
        videoElement.attr('src', videoUrl);

        // Ensure no image background is applied
        $("body").css("--img", "");
        
        // Adding video to the body if not already added
        if ($("#bgVdo").length === 0) {
            $("body").prepend(videoElement);
        }
    }
    setBackground();
    
				}
			};
		});
	});

	// Handle the custom background remove
	remove_custom.click(() => {
		custom_img = null;
		localStorage.removeItem("customImg");
		
    function setBackground() {
        // Video element handling
        const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
        videoElement.attr('src', videoUrl);

        // Ensure no image background is applied
        $("body").css("--img", "");
        
        // Adding video to the body if not already added
        if ($("#bgVdo").length === 0) {
            $("body").prepend(videoElement);
        }
    }
    setBackground();
    
	});
});

// Handle the clock
function activateClock() {
	const time_element = $("#time");
	const today_element = $("#today");
	let date = new Date();
	let hh = date.getHours();
	let mm = date.getMinutes();
	let ss = date.getSeconds();
	let day = date.getDay();
	let month = date.getMonth();
	let year = date.getFullYear();
	let dayDate = date.getDate();
	let session = "AM";
	if (hh > 12) {
		hh = hh - 12;
		session = "PM";
	}
	if (hh == 12) {
		session = "PM";
	}
	if (hh == 0) {
		hh = 12;
	}
	hh = hh < 10 ? "0" + hh : hh;
	mm = mm < 10 ? "0" + mm : mm;
	ss = ss < 10 ? "0" + ss : ss;
	time_element.text(`${hh}:${mm}:${ss} ${session}`);
	// add the day and date in the date section
	let dayArray = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let monthArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	if (
		today_element.text() !=
		`${dayArray[day]}, ${monthArray[month]} ${dayDate}, ${year}`
	) {
		today_element.text(
			`${dayArray[day]}, ${monthArray[month]} ${dayDate}, ${year}`,
		);
	}
	setTimeout(activateClock, 1000);
}

// Handle the shortcuts
function createShortcuts() {
	const shortcut_element = $("#shortcutContainer");
	let add_shortcut = $("#addShortcut");
	let add_name = $("#addName");
	let add_url = $("#addUrl");
	let append_shortcut = $("#appendShortcut");
	shortcut_element.empty();
	for (let i = 0; i < shortcut_data.length; i++) {
		const link = shortcut_data[i];
		const link_name = link.name;
		const link_url = link.url;
		const link_element = `
        <div class="link">
            <a href="${link_url}"  rel="noopener noreferrer" title="${link_url}" class="shortcutLink">
                <img src="https://www.google.com/s2/favicons?domain=${link_url}&sz=48"></img>
                <p>${link_name}</p>
            </a>
            <a class="removeLink" title="Delete ${link_name} shortcut" removeLink="${link_url}">
                <span class="material-symbols-outlined">
                    close
                </span>
            </a>
        </div>`;
		shortcut_element.append(link_element);
	}
	const createLinkButton = `<div class="link">
            <a id="createShortcut" title="Prepare for confusion" class="shortcutLink">
                <span class="material-symbols-outlined">
                    add
                </span>
                <p>Confusions</p>
            </a>
        </div>`;
	shortcut_element.append(createLinkButton);
	create_shortcut = $("#createShortcut");
	create_shortcut.click(function () {
		add_shortcut.toggleClass("flex").toggleClass("none");
	});
	append_shortcut.click(function () {
		let link_name = add_name.val();
		let link_url = add_url.val();
		if (
			link_name != null &&
			link_url != null &&
			link_name != "" &&
			link_url != ""
		) {
			if (link_url.includes("http://") == false && link_url.includes("https://") == false){
				link_url = `http://${link_url}`;
			}
			shortcut_data.push({ name: link_name, url: link_url });
			localStorage.setItem("shortcuts", JSON.stringify(shortcut_data));
			add_shortcut.toggleClass("flex").toggleClass("none");
			createShortcuts();
		}
		add_name.val("");
		add_url.val("");
	});
	$(document).on("click", ".removeLink", function (e) {
		e.preventDefault();
		const linkToRemove = $(this).attr("removeLink");
		const newLinks = shortcut_data.filter(
			(link) => link.url !== linkToRemove,
		);
		localStorage.setItem("shortcuts", JSON.stringify(newLinks));
		shortcut_data = newLinks;
		createShortcuts();
	});
}

// Handle the background
function setBackground() {
	const add_custom = $("#addCustom");
	const remove_custom = $("#removeCustom");
	if (custom_img != null) {
		add_custom.hide();
		remove_custom.show();
	} else {
		add_custom.show();
		remove_custom.hide();
	}
	const bg_vdo = $("#bgVdo");
	const bg_mode_toggle = $("#bgModeToggle");
	const img_mode = $("#imgMode");
	if (bg_mode == "img") {
		$("body").css("--img", `url(${img})`);
	} else {
		localStorage.setItem("bgMode", "img");
		bg_mode = "img";
		
    function setBackground() {
        // Video element handling
        const videoElement = $('<video id="bgVdo" autoplay muted loop playsinline></video>');
        videoElement.attr('src', videoUrl);

        // Ensure no image background is applied
        $("body").css("--img", "");
        
        // Adding video to the body if not already added
        if ($("#bgVdo").length === 0) {
            $("body").prepend(videoElement);
        }
    }
    setBackground();
    
	}
}

// Get the image
function getImage() {
	const remove_custom = $("#removeCustom");
	if (custom_img != null) {
		remove_custom.show();
		return custom_img;
	} else {
		remove_custom.hide();
		const random_image = Math.floor(Math.random() * total_images) + 1;
		if (random_image == localStorage.getItem("lastImage")) {
			return getImage();
		} else {
			localStorage.setItem("lastImage", random_image);
			return `wallpapers/${random_image}.jpg`;
		}
	}
}

