// Reveal obfuscated contact info on click. Scraper-Schutz.
(function () {
	function reveal(el) {
		var raw = el.getAttribute('data-u');
		if (!raw) return;
		var decoded;
		try {
			decoded = atob(raw);
		} catch (_) {
			return;
		}
		var type = el.getAttribute('data-type');
		var a = document.createElement('a');
		if (type === 'tel') {
			a.href = 'tel:' + decoded.replace(/\s+/g, '');
		} else {
			a.href = 'mailto:' + decoded;
		}
		a.textContent = decoded;
		el.replaceWith(a);
	}

	function init() {
		var nodes = document.querySelectorAll('.reveal');
		for (var i = 0; i < nodes.length; i++) {
			var el = nodes[i];
			el.addEventListener('click', function (e) {
				e.preventDefault();
				reveal(e.currentTarget);
			});
			el.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					reveal(e.currentTarget);
				}
			});
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
