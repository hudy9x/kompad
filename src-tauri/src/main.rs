#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;
use std::path::Path;

fn checkExistApplication() {
    //Linux
    let app_path = Path::new("/usr/local/bin/docker-compose");
    if app_path.exists() {
        println!("Ứng dụng đã được cài đặt trên máy tính của bạn.");
    } else {
        println!("Ứng dụng chưa được cài đặt trên máy tính của bạn.");
    }
}

fn main() {
    checkExistApplication();
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(2));
                println!("Done initializing.");

                // set_shadow is only supported on Windows and macOS
                #[cfg(any(target_os = "windows", target_os = "macos"))]
                {
                    set_shadow(&main_window, true).expect("Unsupported platform!");
                }

                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
