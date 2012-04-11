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
                G += E.charAt((H[F >> 2] >> ((F % 4) * 8 + 4)) & 15) 
                        + E.charAt((H[F >> 2] >> ((F % 4) * 8)) & 15)
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
