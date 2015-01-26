/*
陈小亮
2014-11-4
*/
define(['backbone', 'css!main/dialog/dialog.css', 'text!main/dialog/dialog.html'], function(Backbone, CSS, HTML) {
	return Backbone.View.extend({

		className: "mask",

		events: {
			"click #dialog-ok": "handleOk",
			"click #dialog-cancel": "handleCancel"
		},
		/*
		theme: 1.dialog-ios 2.dialog-android
		type: 1.dialog 2.alert
		*/
		defaults: {
			message: "Put Text Here",
			okText: "确定",
			cancelText: "取消",
			theme: 'dialog-ios',
			customButton: null,
			type: "dialog",
			timeout: 1500
		},

		initialize: function(options) {
			var _this = this;
			this.defaults = _.extend(this.defaults, options);
			var template = _.template($(HTML).text());
			this.$el.html((template(this.defaults)));
			_.each(this.defaults.customButton, function(button) {
				_this.$("#"+button.id).click(function() {
					if(button.action) button.action();
					_this.dismiss();
				});
			})
		},

		show: function() {
			document.body.appendChild(this.el);
			var _this = this;
			if(this.defaults.type == "alert") {
				setTimeout(function() {
					_this.dismiss();
				}, this.defaults.timeout);
			}
		},

		handleOk: function() {
			if(this.defaults.ok) this.defaults.ok();
			this.dismiss();
		},

		handleCancel: function() {
			if(this.defaults.cancel) this.defaults.cancel();
			this.dismiss();
		},

		dismiss: function() {
			var _this = this;
			this.$el.find('.pure-dialog').toggleClass('zoomIn zoomOut');
			this.$el.toggleClass('animated fadeOut');
			setTimeout(function() {
				_this.$el.remove();
				_this.trigger("dismiss");
			}, 200);
		} 

	})
});