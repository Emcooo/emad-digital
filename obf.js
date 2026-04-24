// Contact info is rendered as PNG images to block OCR-less scrapers.
// Click copies the value into the clipboard and shows a short toast.
(function () {
	var TOAST_MS = 1800;

	function decode(raw) {
		try {
			return atob(raw);
		} catch (_) {
			return '';
		}
	}

	function showToast(msg) {
		var t = document.createElement('div');
		t.className = 'toast';
		t.textContent = msg;
		document.body.appendChild(t);
		// force reflow for transition
		void t.offsetWidth;
		t.classList.add('toast--in');
		setTimeout(function () {
			t.classList.remove('toast--in');
			setTimeout(function () {
				t.remove();
			}, 250);
		}, TOAST_MS);
	}

	function copyText(text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(text);
		}
		// Legacy fallback
		return new Promise(function (resolve, reject) {
			try {
				var ta = document.createElement('textarea');
				ta.value = text;
				ta.setAttribute('readonly', '');
				ta.style.position = 'absolute';
				ta.style.left = '-9999px';
				document.body.appendChild(ta);
				ta.select();
				var ok = document.execCommand('copy');
				ta.remove();
				ok ? resolve() : reject(new Error('copy failed'));
			} catch (e) {
				reject(e);
			}
		});
	}

	function onActivate(el) {
		var value = decode(el.getAttribute('data-u'));
		if (!value) return;
		var type = el.getAttribute('data-type');
		copyText(value).then(
			function () {
				showToast(type === 'tel' ? 'Telefon kopiert: ' + value : 'E-Mail kopiert: ' + value);
			},
			function () {
				// Fallback: open native mailto/tel handler
				window.location.href = (type === 'tel' ? 'tel:' : 'mailto:') + value.replace(/\s+/g, '');
			}
		);
	}

	function init() {
		var nodes = document.querySelectorAll('.reveal');
		for (var i = 0; i < nodes.length; i++) {
			var el = nodes[i];
			el.addEventListener('click', function (e) {
				e.preventDefault();
				onActivate(e.currentTarget);
			});
			el.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onActivate(e.currentTarget);
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
