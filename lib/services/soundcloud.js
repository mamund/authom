var OAuth2 = require("./oauth2")

function SoundCloud(options) {
  ["code", "token", "user"].forEach(function(name) {
    this[name] = Object.create(this[name])
  }, this)

  this.code.query = {
    client_id: options.id,
    scope: "non-expiring",
    response_type: "code"
  }

  this.token.query = {
    client_id: options.id,
    client_secret: options.secret,
    grant_type: "authorization_code"
  }

  this.user.query = {}

  this.on("request", this.onRequest.bind(this))
}

SoundCloud.prototype = new OAuth2

SoundCloud.prototype.code = {
  protocol: "https",
  host: "soundcloud.com",
  pathname: "/connect"
}

SoundCloud.prototype.token = {
  method: "POST",
  host: "api.soundcloud.com",
  path: "/oauth2/token",
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
}

SoundCloud.prototype.user = {
  host: "api.soundcloud.com",
  path: "/me.json",
  tokenKey: "oauth_token"
}

module.exports = SoundCloud