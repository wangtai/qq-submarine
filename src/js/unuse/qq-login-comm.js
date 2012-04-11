String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "")
};
var sys = {
        $: function(B) {
                return document.getElementById(B)
        },
        onload: function(C) {
                        var D = window.onload;
                        window.onload = function() {
                                if (typeof(D) == "function") {
                                        D()
                                }
                                if (typeof(C) == "function") {
                                        C()
                                }
                        }
                },
        getQueryValue: function(F, D) {
                               var E = "";
                               if (D) {
                                       E = "&" + D
                               } else {
                                       E = window.location.search.replace(/(^\?+)|(#\S*$)/g, "")
                               }
                               E = E.match(new RegExp("(^|&)" + F + "=([^&]*)(&|$)"));
                               return ! E ? "": decodeURIComponent(E[2])
                       }
};
function getCookie(B) {
        return pt.cookie.get(B)
}
function setCookie(D, C) {
        pt.cookie.set(D.value)
}
var pt = {
        action: [0, 0],
        err_m: null,
        isHttps: false,
        isIpad: false,
        mibao_css: "",
        needAt: "",
        t_appid: 46000101,
        seller_id: 703010802,
        needCodeTip: false,
        chkUin: function(D) {
                D = D.trim();
                if (D.length == 0) {
                        return false
                }
                if (window.location.hostname.match(/paipai.com$/)) {
                        if (D.length < 64 && (new RegExp(/^[A-Za-z0-9]+@{1}[A-Za-z0-9]+$/).test(D))) {
                                return true
                        }
                }
                if (g_appid == pt.seller_id && D.length < 64 && (new RegExp(/^[A-Za-z0-9]+@{1}[0-9]+$/).test(D))) {
                        return true
                }
                pt.needAt = "";
                var C = pt.chkAccount;
                if (t_appid == g_appid) {
                        if (C.isQQ(D) || C.isMail(D)) {
                                return true
                        } else {
                                if (C.isNick(D) || C.isName(D)) {
                                        pt.needAt = "@" + encodeURIComponent(D);
                                        return true
                                } else {
                                        if (C.isPhone(D)) {
                                                pt.needAt = "@" + D.replace(/^(86|886)/, "");
                                                return true
                                        }
                                }
                        }
                        pt.needAt = "";
                        return false
                } else {
                        if (C.isQQ(D) || C.isMail(D)) {
                                return true
                        }
                        if (C.isDXPhone(D)) {
                                pt.needAt = "@" + D.replace(/^(86|886)/, "");
                                return true
                        }
                        if (C.isNick(D)) {
                                $("u").value = D + "@qq.com";
                                return true
                        }
                        return false
                }
        },
        chkAccount: {
                            isQQ: function(B) {
                                          return /^[1-9]{1}\d{4,9}$/.test(B)
                                  },
                            isNick: function(B) {
                                            return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(B)
                                    },
                            isName: function(B) {
                                            if (B == "<è¯·è¾å¥å¸å·>") {
                                                    return false
                                            }
                                            return /[\u4E00-\u9FA5]/.test(B) ? (B.length > 8 ? false: true) : false
                                    },
                            isPhone: function(B) {
                                             return /^(?:86|886|)1(?:(?:3\d{1})|44|(?:5[012789356]{1})|(?:8[065879]{1}))\d{8}$/.test(B)
                                     },
                            isDXPhone: function(B) {
                                               return /^(?:86|886|)1(?:33|53|80|89)\d{8}$/.test(B)
                                       },
                            isMail: function(B) {
                                            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(B)
                                    }
                    },
        cookie: {
                        get: function(C) {
                                     var D = document.cookie.match(new RegExp("(^| )" + C + "=([^;]*)(;|$)"));
                                     return D ? D[2] : ""
                             },
                        set: function(L, J) {
                                     var N = arguments;
                                     var O = arguments.length;
                                     var M = (2 < O) ? N[2].toGMTString() : "";
                                     var P = (3 < O) ? N[3] : "";
                                     var K = (4 < O) ? N[4] : "";
                                     var I = (5 < O) ? N[5] : false;
                                     document.cookie = L + "=" + escape(J) + ";expires =" + M + ";path = " + P + ";domain =" + K + ((I == true) ? ";secure": " ")
                             }
                },
        init: function() {
                      if (pt.t_appid == g_appid) {
                              if (sys.$("u")) {
                                      sys.$("u").setAttribute("style", "")
                              }
                              sys.$("u").style.cssText = ""
                      }
                      pt.isHttps = (/^https/g.test(window.location));
                      sys.onload(function() {
                              pt.err_m = sys.$("err_m");
                              if (g_appid != 1003903) {
                                      document.body.onclick = function(A) {
                                              A = A | window.event;
                                              pt.action[0]++
                                      }
                              }
                              document.body.onkeydown = function(A) {
                                      A = A | window.event;
                                      pt.action[1]++
                              };
                              if (Math.random() < 0.1 && !pt.isHttps) {
                                      pt.loadScript("http://mat1.gtimg.com/www/js/common.js",
                                              function() {
                                                      if (typeof checkNonTxDomain == "function") {
                                                              checkNonTxDomain(1, 5)
                                                      }
                                              })
                              }
                      });
                      pt.mibao_css = sys.getQueryValue("mibao_css");
                      var B = navigator.userAgent.toLowerCase();
                      pt.isIpad = /ipad/i.test(B);
                      pt.needCodeTip = window.needCodeTip ? needCodeTip: false
              },
        show_err: function(B) {
                          if (pt.err_m && (typeof ptui_notifySize == "function")) {
                                  pt.err_m.innerHTML = B;
                                  pt.err_m.style.display = "block";
                                  ptui_notifySize("login");
                                  return
                          } else {
                                  alert(B)
                          }
                  },
        hide_err: function() {
                          if (pt.err_m && (typeof ptui_notifySize == "function")) {
                                  pt.err_m.innerHTML = "";
                                  pt.err_m.style.display = "none";
                                  ptui_notifySize("login");
                                  return
                          }
                  },
        loadScript: function(D, F) {
                            var E = document.createElement("script");
                            E.charset = "UTF-8";
                            E.onload = E.onreadystatechange = function() {
                                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                                            F ? F() : "";
                                            E.onload = E.onreadystatechange = null
                                    }
                            };
                            E.src = D;
                            document.getElementsByTagName("head")[0].appendChild(E)
                    },
        winName: {
                         set: function(F, E) {
                                      var D = window.name || "";
                                      if (D.match(new RegExp(";" + F + "=([^;]*)(;|$)"))) {
                                              window.name = D.replace(new RegExp(";" + F + "=([^;]*)"), ";" + F + "=" + E)
                                      } else {
                                              window.name = D + ";" + F + "=" + E
                                      }
                              },
                         get: function(F) {
                                      var D = window.name || "";
                                      var E = D.match(new RegExp(";" + F + "=([^;]*)(;|$)"));
                                      return E ? E[1] : ""
                              },
                         clear: function(C) {
                                        var D = window.name || "";
                                        window.name = D.replace(new RegExp(";" + C + "=([^;]*)"), "")
                                }
                 }
};
pt.init();
var lastUin = 1;
var t_appid = 46000101;
var g_changeNum = 0;
var g_checkTime = 0;
var g_imgTime = 0;
var first = true;
var changeimg = false;
var defaultuin = "";
var login_param = g_href.substring(g_href.indexOf("?") + 1);
function ptui_onEnableLLogin(D) {
        var E = D.low_login_enable;
        var F = D.low_login_hour;
        if (E != null && F != null) {
                F.disabled = !E.checked
        }
}
function ptui_setDefUin(F, D) {
        if (!D) {
                var D = unescape(pt.cookie.get("ptui_loginuin"));
                var E = pt.chkAccount;
                if (g_appid != t_appid && (E.isNick(D) || E.isName(D) || (E.isPhone(D) && !E.isDXPhone(D)))) {
                        D = pt.cookie.get("pt2gguin").replace(/^o/, "") - 0;
                        D = D == 0 ? "": D
                }
                defaultuin = D
        }
        if (D) {
                F.u.value = D
        }
}
var g_ptredirect = -1;
var g_xmlhttp;
var g_loadcheck = true;
var g_submitting = false;
function ptui_needVC(D, F) {
        D = pt.needAt ? pt.needAt: D;
        var E = (pt.isHttps ? "https://ssl.": "http://check.") + "ptlogin2." + g_domain + "/check?uin=" + D + "&appid=" + F + "&r=" + Math.random();
        pt.loadScript(E);
        g_loadcheck = true;
        return
}
function ptui_checkVC(F, E) {
        g_loadcheck = false;
        g_checkTime = new Date().getTime() - g_checkTime;
        if (g_submitting) {
                return
        }
        var G = new Date();
        if (defaultuin != "" && g_changeNum <= 1) {
                g_time.time7 = G;
                var H = {
                        "12": g_time.time7 - g_time.time6
                };
                if (defaultuin != "") {
                        H["16"] = g_time.time6 - g_time.time3,
                                H["17"] = g_time.time7 - g_time.time3
                }
                if (!xuiFrame) {
                        ptui_speedReport(H)
                }
        } else {
                g_time.time10 = G;
                var H = {
                        "13": g_time.time10 - g_time.time9
                };
                ptui_speedReport(H)
        }
        if (F == "0") {
                $("verifycode").value = E;
                loadVC(false)
        } else {
                $("verifycode").value = pt.needCodeTip ? str_codetip: "";
                loadVC(true)
        }
}
function ptui_changeImg(J, K, O) {
        changeimg = true;
        var P = pt.needAt ? pt.needAt: g_uin;
        var M = (pt.isHttps ? "https://ssl.": "http://") + "captcha." + J + "/getimage?&uin=" + P + "&aid=" + K + "&" + Math.random();
        var N = $("imgVerify");
        try {
                if (N != null) {
                        N.src = M;
                        var L = $("verifycode");
                        if (L != null && L.disabled == false && O) {
                                L.focus();
                                L.select()
                        }
                }
        } catch(I) {}
}
function ptui_initFocus(F) {
        if (pt.isIpad) {
                return
        }
        try {
                var G = F.u;
                var I = F.p;
                var H = F.verifycode;
                if (G.value == "" || str_uintip == G.value) {
                        G.focus();
                        return
                }
                if (I.value == "") {
                        I.focus();
                        return
                }
                if (H.value == "") {
                        H.focus()
                }
        } catch(J) {}
}
function ajax_Submit() {
        var N = true;
        var P = document.forms[0];
        var R = P.action;
        var T = (pt.isHttps ? R.replace(/^http:\/\//, "https://ssl.") : R) + "?";
        var Q = document.getElementById("login2qq");
        for (var L = 0; L < P.length; L++) {
                if (P[L].name == "ipFlag" && !P[L].checked) {
                        T += P[L].name + "=-1&";
                        continue
                }
                if (P[L].name == "fp" || P[L].type == "submit") {
                        continue
                }
                if (P[L].name == "ptredirect") {
                        g_ptredirect = P[L].value
                }
                if (P[L].name == "low_login_enable" && (!P[L].checked)) {
                        N = false;
                        continue
                }
                if (P[L].name == "low_login_hour" && (!N)) {
                        continue
                }
                if (P[L].name == "webqq_type" && !Q && (!P[L].checked)) {
                        continue
                }
                T += P[L].name;
                T += "=";
                if (P[L].name == "u" && pt.needAt) {
                        T += pt.needAt + "&";
                        continue
                }
                if (P[L].name == "p") {
                        var K = "";
                        K += P.verifycode.value;
                        K = K.toUpperCase();
                        T += md5(md5_3(P.p.value) + K)
                } else {
                        if (P[L].name == "u1" || P[L].name == "ep") {
                                var O = P[L].value;
                                var S = "";
                                if (g_appid == "1003903" && Q) {
                                        S = /\?/g.test(O) ? "&": "?";
                                        var M = document.getElementById("webqq_type").value;
                                        S += "login2qq=" + Q.value + "&webqq_type=" + M
                                }
                                T += encodeURIComponent(O + S)
                        } else {
                                T += P[L].value
                        }
                }
                T += "&"
        }
        T += "fp=loginerroralert&action=" + pt.action.join("-") + "-" + (new Date() - g_begTime) + "&mibao_css=" + pt.mibao_css;
        pt.winName.set("login_param", encodeURIComponent(login_param));
        pt.loadScript(T);
        return
}
function ptuiCB(I, K, J, L, M) {
        M += '<a href="http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=10011-' + $("u").value + '" target="_blank">' + str_yjfk + "</a>";
        $("p").blur();
        g_time.time13 = new Date();
        var N = {
                "15": g_time.time13 - g_time.time12
        };
        ptui_speedReport(N);
        first = false;
        if (J != "") {
                pt.hide_err();
                switch (L) {
                        case "0":
                                window.location.href = J;
                                break;
                        case "1":
                                top.location.href = J;
                                break;
                        case "2":
                                parent.location.href = J;
                                break;
                        default:
                                top.location.href = J
                }
                return
        }
        g_submitting = false;
        if (I == 0) {
                top.location = document.forms[0].ul.value;
                return
        } else {
                if (K == 0) {
                        if (M && M != "") {
                                pt.show_err(M)
                        } else {
                                pt.show_err("æ¨çè¾å¥æè¯¯ï¼è¯·éè¯ã")
                        }
                } else {
                        pt.show_err(M);
                        $("p").value = "";
                        $("p").focus();
                        $("p").select()
                }
                if (isLoadVC) {
                        ptui_changeImg(g_domain, g_appid, true);
                        $("verifycode").value = pt.needCodeTip ? str_codetip: "";
                        loadVC(true);
                        $("verifycode").focus();
                        $("verifycode").select()
                } else {
                        if (K == 0) {
                                g_uin = 0
                        }
                }
                if (I == 3 || I == 4) {
                        if (navigator.userAgent.toLowerCase().indexOf("webkit") > -1) {
                                $("u").focus()
                        }
                        if (I == 3) {
                                $("p").value = ""
                        }
                        $("p").focus();
                        $("p").select();
                        if (I == 4) {
                                try {
                                        $("verifycode").focus();
                                        $("verifycode").select()
                                } catch(H) {}
                        }
                        if (K != 0) {
                                $("verifycode").value = pt.needCodeTip ? str_codetip: "";
                                loadVC(true);
                                g_submitting = true
                        }
                }
        }
}
function browser_version() {
        var B = navigator.userAgent.toLowerCase();
        return B.match(/msie ([\d.]+)/) ? 1 : B.match(/firefox\/([\d.]+)/) ? 3 : B.match(/chrome\/([\d.]+)/) ? 5 : B.match(/opera.([\d.]+)/) ? 9 : B.match(/version\/([\d.]+).*safari/) ? 7 : 1
}
function ptui_reportSpeed(G, H) {
        if (pt.isHttps || (window.flag2 && Math.random() > 0.5) || (!window.flag2 && Math.random() > 0.05)) {
                return
        }
        var F = browser_version();
        url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=" + (window.flag2 ? window.flag2: 1) + "&flag3=" + F;
        for (var E = 0; E < g_speedArray.length; E++) {
                url += "&" + g_speedArray[E][0] + "=" + (g_speedArray[E][1] - G)
        }
        if (H != 0) {
                url += "&4=" + (G - H)
        }
        imgSendTimePoint = new Image();
        imgSendTimePoint.src = url + "&24=" + g_appid
}
function ptui_VCReport() {
        if (pt.isHttps || (window.flag2 && Math.random() > 0.5) || (!window.flag2 && Math.random() > 0.05)) {
                return
        }
        if (g_imgTime < 1000000000000) {
                return
        }
        var B = browser_version();
        url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=" + (window.flag2 ? window.flag2: 1) + "&flag3=" + B;
        url += "&5=" + g_checkTime + "&6=" + g_imgTime + "&24=" + g_appid
}
function ptui_imgPoint() {
        if (g_imgTime > 0) {
                return
        }
        g_imgTime = new Date() - g_imgTime;
        ptui_VCReport()
}
function ptui_reportAttr(B) {
        if (Math.random() > 0.05) {
                return
        }
        url = "http://ui.ptlogin2." + g_domain + "/cgi-bin/report?id=" + B;
        imgAttr = new Image();
        imgAttr.src = url
}
function ptui_reportNum(C) {
        if (Math.random() > 0.05) {
                return
        }
        url = "http://ui.ptlogin2." + g_domain + "/cgi-bin/report?id=1000&n=" + C;
        var D = new Image();
        D.src = url
}
function imgLoadReport() {
        if (changeimg) {
                return
        }
        var D = new Date();
        var C = {};
        if (defaultuin != "" && g_changeNum <= 1) {
                g_time.time8 = D;
                if (!xuiFrame && defaultuin != "") {
                        C["9"] = g_time.time8 - g_time.time1;
                        C["10"] = g_time.time8 - g_time.time3;
                        C["11"] = g_time.time8 - g_time.time7
                }
        } else {
                g_time.time11 = D;
                C["14"] = g_time.time11 - g_time.time10
        }
        ptui_speedReport(C)
}
function webLoginReport() {
        var G = {};
        G["7"] = g_time.time3 - g_time.time1;
        if (!xuiFrame) {
                G["8"] = g_time.time4 - g_time.time1
        }
        try {
                if (location.hash) {
                        var E = location.hash.substring(1, location.hash.length);
                        if (E.indexOf("_") > -1) {
                                var F = E.split("_");
                                g_time.time0 = F[1] >= F[0] ? F[0] : F[1];
                                g_time.time2 = F[1] >= F[0] ? F[1] : F[0]
                        } else {
                                g_time.time2 = E
                        }
                }
        } catch(H) {}
        if (g_time.time2 && g_time.time2 > 0) {
                G["18"] = g_time.time1 - g_time.time2;
                G["21"] = g_time.time3 - g_time.time2;
                if (G["18"] > 60000 || G["21"] > 60000) {
                        return
                }
        }
        if (g_time.time0 && g_time.time0 > 0) {
                G["19"] = g_time.time2 - g_time.time0;
                G["20"] = g_time.time3 - g_time.time0;
                if (G["19"] > 60000 || G["20"] > 60000) {
                        return
                }
        }
        ptui_speedReport(G)
}
function ptui_speedReport(H) {
        if (!first || pt.isHttps || (window.flag2 && Math.random() > 0.5) || (!window.flag2 && Math.random() > 0.05)) {
                return
        }
        var F = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=" + (window.flag2 ? window.flag2: 1) + "&flag3=" + browser_version();
        var J = 0;
        for (var I in H) {
                F += "&" + I + "=" + H[I];
                J++
        }
        if (J == 0) {
                return
        }
        var G = new Image();
        G.src = F + "&24=" + g_appid
}
function ptui_notifyClose() {
        try {
                if (parent.ptlogin2_onClose) {
                        parent.ptlogin2_onClose()
                } else {
                        if (top == this) {
                                window.close()
                        }
                }
        } catch(B) {
                window.close()
        }
}
function ptui_setUinColor(G, E, F) {
        var H = $(G);
        if (str_uintip == H.value) {
                H.style.color = F
        } else {
                H.style.color = E
        }
}
function ptui_checkPwdOnInput() {
        if ($("p").value.length >= 16) {
                return false
        }
        return true
}
function ptui_onLogin(F) {
        try {
                if (parent.ptlogin2_onLogin) {
                        if (!parent.ptlogin2_onLogin()) {
                                return false
                        }
                }
                if (parent.ptlogin2_onLoginEx) {
                        var G = F.u.value;
                        var E = F.verifycode.value;
                        if (str_uintip == G) {
                                G = ""
                        }
                        if (!parent.ptlogin2_onLoginEx(G, E)) {
                                return false
                        }
                }
        } catch(H) {}
        return ptui_checkValidate(F)
}
function ptui_onLoginEx(D, F) {
        g_time.time12 = new Date();
        if (ptui_onLogin(D)) {
                var E = new Date();
                E.setHours(E.getHours() + 24 * 30);
                pt.cookie.set("ptui_loginuin", D.u.value, E, "/", F)
        }
        return false
}
function ptui_onReset(D) {
        try {
                if (parent.ptlogin2_onReset) {
                        if (!parent.ptlogin2_onReset()) {
                                return false
                        }
                }
        } catch(C) {}
        return true
}
function ptui_checkValidate(F) {
        var G = F.u;
        var I = F.p;
        var H = F.verifycode;
        if (G.value == "" || str_uintip == G.value) {
                pt.show_err(str_no_uin);
                G.focus();
                return false
        }
        G.value = G.value.trim();
        if (!pt.chkUin(G.value)) {
                pt.show_err(str_inv_uin);
                G.focus();
                G.select();
                return false
        }
        if (I.value == "") {
                pt.show_err(str_no_pwd);
                I.focus();
                return false
        }
        if (H.value == "") {
                if (!isLoadVC) {
                        loadVC(true);
                        g_submitting = true;
                        return false
                }
                pt.show_err(str_no_vcode);
                try {
                        H.focus()
                } catch(J) {}
                if (!g_loadcheck) {
                        ptui_reportAttr(78028)
                } else {
                        ptui_reportAttr(78029)
                }
                return false
        }
        if (H.value.length < 4) {
                pt.show_err(str_inv_vcode);
                H.focus();
                H.select();
                return false
        }
        if (isLoadVC && !(/^[a-zA-Z0-9]+$/.test(H.value))) {
                pt.show_err("è¯·è¾å¥æ­£ç¡®çéªè¯ç ï¼");
                H.focus();
                H.select();
                return false
        }
        I.setAttribute("maxlength", "32");
        ajax_Submit();
        ptui_reportNum(g_changeNum);
        g_changeNum = 0;
        return true
}
var hexcase = 1;
var b64pad = "";
var chrsz = 8;
var mode = 32;
function md5_3(C) {
        var D = new Array;
        D = core_md5(str2binl(C), C.length * chrsz);
        D = core_md5(D, 16 * chrsz);
        D = core_md5(D, 16 * chrsz);
        return binl2hex(D)
}
function md5(B) {
        return hex_md5(B)
}
function hex_md5(B) {
        return binl2hex(core_md5(str2binl(B), B.length * chrsz))
}
function str_md5(B) {
        return binl2str(core_md5(str2binl(B), B.length * chrsz))
}
function hex_hmac_md5(D, C) {
        return binl2hex(core_hmac_md5(D, C))
}
function b64_hmac_md5(D, C) {
        return binl2b64(core_hmac_md5(D, C))
}
function str_hmac_md5(D, C) {
        return binl2str(core_hmac_md5(D, C))
}
function core_md5(T, N) {
        T[N >> 5] |= 128 << ((N) % 32);
        T[(((N + 64) >>> 9) << 4) + 14] = N;
        var U = 1732584193;
        var V = -271733879;
        var L = -1732584194;
        var M = 271733878;
        for (var Q = 0; Q < T.length; Q += 16) {
                var O = U;
                var P = V;
                var R = L;
                var S = M;
                U = md5_ff(U, V, L, M, T[Q + 0], 7, -680876936);
                M = md5_ff(M, U, V, L, T[Q + 1], 12, -389564586);
                L = md5_ff(L, M, U, V, T[Q + 2], 17, 606105819);
                V = md5_ff(V, L, M, U, T[Q + 3], 22, -1044525330);
                U = md5_ff(U, V, L, M, T[Q + 4], 7, -176418897);
                M = md5_ff(M, U, V, L, T[Q + 5], 12, 1200080426);
                L = md5_ff(L, M, U, V, T[Q + 6], 17, -1473231341);
                V = md5_ff(V, L, M, U, T[Q + 7], 22, -45705983);
                U = md5_ff(U, V, L, M, T[Q + 8], 7, 1770035416);
                M = md5_ff(M, U, V, L, T[Q + 9], 12, -1958414417);
                L = md5_ff(L, M, U, V, T[Q + 10], 17, -42063);
                V = md5_ff(V, L, M, U, T[Q + 11], 22, -1990404162);
                U = md5_ff(U, V, L, M, T[Q + 12], 7, 1804603682);
                M = md5_ff(M, U, V, L, T[Q + 13], 12, -40341101);
                L = md5_ff(L, M, U, V, T[Q + 14], 17, -1502002290);
                V = md5_ff(V, L, M, U, T[Q + 15], 22, 1236535329);
                U = md5_gg(U, V, L, M, T[Q + 1], 5, -165796510);
                M = md5_gg(M, U, V, L, T[Q + 6], 9, -1069501632);
                L = md5_gg(L, M, U, V, T[Q + 11], 14, 643717713);
                V = md5_gg(V, L, M, U, T[Q + 0], 20, -373897302);
                U = md5_gg(U, V, L, M, T[Q + 5], 5, -701558691);
                M = md5_gg(M, U, V, L, T[Q + 10], 9, 38016083);
                L = md5_gg(L, M, U, V, T[Q + 15], 14, -660478335);
                V = md5_gg(V, L, M, U, T[Q + 4], 20, -405537848);
                U = md5_gg(U, V, L, M, T[Q + 9], 5, 568446438);
                M = md5_gg(M, U, V, L, T[Q + 14], 9, -1019803690);
                L = md5_gg(L, M, U, V, T[Q + 3], 14, -187363961);
                V = md5_gg(V, L, M, U, T[Q + 8], 20, 1163531501);
                U = md5_gg(U, V, L, M, T[Q + 13], 5, -1444681467);
                M = md5_gg(M, U, V, L, T[Q + 2], 9, -51403784);
                L = md5_gg(L, M, U, V, T[Q + 7], 14, 1735328473);
                V = md5_gg(V, L, M, U, T[Q + 12], 20, -1926607734);
                U = md5_hh(U, V, L, M, T[Q + 5], 4, -378558);
                M = md5_hh(M, U, V, L, T[Q + 8], 11, -2022574463);
                L = md5_hh(L, M, U, V, T[Q + 11], 16, 1839030562);
                V = md5_hh(V, L, M, U, T[Q + 14], 23, -35309556);
                U = md5_hh(U, V, L, M, T[Q + 1], 4, -1530992060);
                M = md5_hh(M, U, V, L, T[Q + 4], 11, 1272893353);
                L = md5_hh(L, M, U, V, T[Q + 7], 16, -155497632);
                V = md5_hh(V, L, M, U, T[Q + 10], 23, -1094730640);
                U = md5_hh(U, V, L, M, T[Q + 13], 4, 681279174);
                M = md5_hh(M, U, V, L, T[Q + 0], 11, -358537222);
                L = md5_hh(L, M, U, V, T[Q + 3], 16, -722521979);
                V = md5_hh(V, L, M, U, T[Q + 6], 23, 76029189);
                U = md5_hh(U, V, L, M, T[Q + 9], 4, -640364487);
                M = md5_hh(M, U, V, L, T[Q + 12], 11, -421815835);
                L = md5_hh(L, M, U, V, T[Q + 15], 16, 530742520);
                V = md5_hh(V, L, M, U, T[Q + 2], 23, -995338651);
                U = md5_ii(U, V, L, M, T[Q + 0], 6, -198630844);
                M = md5_ii(M, U, V, L, T[Q + 7], 10, 1126891415);
                L = md5_ii(L, M, U, V, T[Q + 14], 15, -1416354905);
                V = md5_ii(V, L, M, U, T[Q + 5], 21, -57434055);
                U = md5_ii(U, V, L, M, T[Q + 12], 6, 1700485571);
                M = md5_ii(M, U, V, L, T[Q + 3], 10, -1894986606);
                L = md5_ii(L, M, U, V, T[Q + 10], 15, -1051523);
                V = md5_ii(V, L, M, U, T[Q + 1], 21, -2054922799);
                U = md5_ii(U, V, L, M, T[Q + 8], 6, 1873313359);
                M = md5_ii(M, U, V, L, T[Q + 15], 10, -30611744);
                L = md5_ii(L, M, U, V, T[Q + 6], 15, -1560198380);
                V = md5_ii(V, L, M, U, T[Q + 13], 21, 1309151649);
                U = md5_ii(U, V, L, M, T[Q + 4], 6, -145523070);
                M = md5_ii(M, U, V, L, T[Q + 11], 10, -1120210379);
                L = md5_ii(L, M, U, V, T[Q + 2], 15, 718787259);
                V = md5_ii(V, L, M, U, T[Q + 9], 21, -343485551);
                U = safe_add(U, O);
                V = safe_add(V, P);
                L = safe_add(L, R);
                M = safe_add(M, S)
        }
        if (mode == 16) {
                return Array(V, L)
        } else {
                return Array(U, V, L, M)
        }
}
function md5_cmn(I, L, G, H, J, K) {
        return safe_add(bit_rol(safe_add(safe_add(L, I), safe_add(H, K)), J), G)
}
function md5_ff(I, J, L, M, K, N, H) {
        return md5_cmn((J & L) | ((~J) & M), I, J, K, N, H)
}
function md5_gg(I, J, L, M, K, N, H) {
        return md5_cmn((J & M) | (L & (~M)), I, J, K, N, H)
}
function md5_hh(I, J, L, M, K, N, H) {
        return md5_cmn(J ^ L ^ M, I, J, K, N, H)
}
function md5_ii(I, J, L, M, K, N, H) {
        return md5_cmn(L ^ (J | (~M)), I, J, K, N, H)
}
function core_hmac_md5(I, M) {
        var N = str2binl(I);
        if (N.length > 16) {
                N = core_md5(N, I.length * chrsz)
        }
        var K = Array(16),
            H = Array(16);
        for (var J = 0; J < 16; J++) {
                K[J] = N[J] ^ 909522486;
                H[J] = N[J] ^ 1549556828
        }
        var L = core_md5(K.concat(str2binl(M)), 512 + M.length * chrsz);
        return core_md5(H.concat(L), 512 + 128)
}
function safe_add(F, G) {
        var H = (F & 65535) + (G & 65535);
        var E = (F >> 16) + (G >> 16) + (H >> 16);
        return (E << 16) | (H & 65535)
}
function bit_rol(D, C) {
        return (D << C) | (D >>> (32 - C))
}
function str2binl(G) {
        var H = Array();
        var F = (1 << chrsz) - 1;
        for (var E = 0; E < G.length * chrsz; E += chrsz) {
                H[E >> 5] |= (G.charCodeAt(E / chrsz) & F) << (E % 32)
        }
        return H
}
function binl2str(H) {
        var G = "";
        var F = (1 << chrsz) - 1;
        for (var E = 0; E < H.length * 32; E += chrsz) {
                G += String.fromCharCode((H[E >> 5] >>> (E % 32)) & F)
        }
        return G
}
function binl2hex(H) {
        var E = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
        var G = "";
        for (var F = 0; F < H.length * 4; F++) {
                G += E.charAt((H[F >> 2] >> ((F % 4) * 8 + 4)) & 15) + E.charAt((H[F >> 2] >> ((F % 4) * 8)) & 15)
        }
        return G
}
function binl2b64(K) {
        var L = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var I = "";
        for (var G = 0; G < K.length * 4; G += 3) {
                var J = (((K[G >> 2] >> 8 * (G % 4)) & 255) << 16) | (((K[G + 1 >> 2] >> 8 * ((G + 1) % 4)) & 255) << 8) | ((K[G + 2 >> 2] >> 8 * ((G + 2) % 4)) & 255);
                for (var H = 0; H < 4; H++) {
                        if (G * 8 + H * 6 > K.length * 32) {
                                I += b64pad
                        } else {
                                I += L.charAt((J >> 6 * (3 - H)) & 63)
                        }
                }
        }
        return I
}
isAbleSubmit = true;
function check() {
        var D = new Date();
        if (defaultuin != "" && g_changeNum == 0) {
                g_time.time6 = D
        } else {
                g_time.time9 = D
        }
        var E = $("u").value.trim();
        $("u").value = E;
        if (g_uin == E || (!pt.chkUin(E))) {
                return
        }
        g_changeNum++;
        g_uin = $("u").value.trim();
        try {
                if (parent.ptui_uin) {
                        parent.ptui_uin(g_uin)
                }
        } catch(F) {}
        ptui_needVC(g_uin, g_appid)
}
function loadVC(H) {
        if (isLoadVC == H && (lastUin == g_uin)) {
                return
        }
        lastUin = g_uin;
        isLoadVC = H;
        if (H == true) {
                var G = $("imgVerify");
                var I = pt.needAt ? pt.needAt: g_uin;
                var J = (pt.isHttps ? "https://ssl.": "http://") + "captcha." + g_domain + "/getimage?aid=" + g_appid + "&r=" + Math.random() + "&uin=" + I;
                var K = new Date();
                G.src = J;
                $("verifyinput").style.display = "";
                $("verifytip").style.display = "";
                $("verifyshow").style.display = "";
                ptui_notifySize("login");
                try {
                        $("p").focus()
                } catch(L) {}
        } else {
                $("verifyinput").style.display = "none";
                $("verifytip").style.display = "none";
                $("verifyshow").style.display = "none";
                ptui_notifySize("login");
                try {
                        $("p").focus()
                } catch(L) {}
        }
}
function onPageClose() {
        ptui_notifyClose()
}
function onFormReset(B) {
        if (ptui_onReset(B)) {
                B.u.style.color = "#CCCCCC";
                return true
        }
        return false
}
function onClickForgetPwd() {
        var C = $("u");
        var D = $("label_forget_pwd");
        if (sys.getQueryValue("fgt") == 2052) {
                g_forget = g_forget.replace("1028", 2052)
        }
        D.href = g_forget;
        if (C != null && C.value != str_uintip) {
                if (D.href.indexOf("?") == -1) {
                        D.href += "?"
                } else {
                        D.href += "&"
                }
                D.href += "aquin=" + C.value
        }
        return true
};
/*  |xGv00|989fef1761bb6b10a8fcd4f834552f1a */

