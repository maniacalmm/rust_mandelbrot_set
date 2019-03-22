use std::io;
use std::option::Option;
use rocket::http::RawStr;
use rocket::response::{NamedFile};
use std::{thread, time};

#[get("/")]
pub fn index() -> io::Result<NamedFile> {
    NamedFile::open("static/index.html")
}

#[get("/mandel?<w>&<h>")]
pub fn test_ajax(w: Option<&RawStr>, h: Option<&RawStr>) -> String {
    format!("your window: {}x{}", w.unwrap(), h.unwrap())
}