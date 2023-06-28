---
layout: post
title: "Port Scanner"
date: 2023-06-28 
categories: ["Pylix", "Scanner"]
tags: "python"
---
# Port Scanner with Python
Port scanners play a crucial role in the reconnaissance stage by aiding in the discovery of open ports on a device. They help determine the services that are actively running on those ports. For instance, port 80 is commonly associated with the HTTP service, and if it is open, it indicates that the target host is likely hosting a website. This knowledge allows us to plan subsequent stages of scanning, particularly focusing on the website.

In this post, I aim to document my thought process, mistakes, and understanding while developing a script. My goal is to provide a step-by-step explanation of each action I took, ensuring that I can reference it in the future or help others understand the process. Currently, my script only identifies open ports without providing information about the services running or the operating system. However, I have plans to enhance this scan in the future to incorporate such details.

It is essential for me to emphasize that my intention is not to become a script kiddie but rather to acquire a deeper understanding of scripting in order to discover and exploit vulnerabilities. I am interested in learning about hacking network protocols and even exploring unconventional areas such as car scanning.

The full code can be found in my [gitbook](https://atomic-5.gitbook.io/atoms-handbook/). 

## Basic Scanner 
The script begins by importing the socket module, which allows the creation of a socket for sending data over the network to the target host. By establishing a connection through the socket, the script can receive an indication regarding the status of the connection. An error code of 11 indicates a connection error, while a code of 0 signifies a successful connection to the port.

```python
import socket

# the target and the ftp port 
host_ip = 'x.x.x.x'
port = 21

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ex = s.connect_ex((target, port))
    if ex == 0:
        print(f"[+] {port} /tcp open")
    s.close()
```

## Taking the next step
The code is too simple, and to meet my goal the scan should include the following: 
1. The ability to scan all ports or specific ports
2. Achieve speed 
3. Perform banner grabbing (in a future post)
4. incorporate parsing

### Scanning All Ports
To scan all ports, a for loop can be used to attempt a connection with each port within the range of 1 to 65535. However, it is important to note that this scanning method has a significant drawback: it is inherently slow, especially when there is no timeout set. As a result, there can be a considerable delay between each port connection attempt.

```python
import socket

# the target and the ftp port 
host_ip = 'x.x.x.x'

def raw_scanner(target, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    ex = s.connect_ex((target, port))
        if ex == 0:
            print(f"[+] {port} /tcp open")
        s.close()

for port in range(1,65535):
    raw_scanner(host_ip, port)
```

### Setting Timeout
In the raw_scanner function, it is recommended to set the timeout for the socket after creating it, but before attempting the connection. Additionally, I have added a print statement to check the duration for each port and measure the time it takes. However, despite these adjustments, the scanner remains slow.

```python
def raw_scanner(target, port):
    print("[!] Trying to connect with port: ", port)
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(10)
    ex = s.connect_ex((target, port))
    if ex == 0:
        print(f"[+] {port} /tcp open")
    else:
        print(ex)
    s.close()
```

## Threading: 
The code is functioning, but it is currently experiencing significant slowness, taking over a minute to scan port 20. To address this issue, I have identified the potential solution of using threading, which allows the script to run in multiple threads concurrently instead of a single thread in the background. This approach can enhance performance by enabling one thread to focus on a specific task while another thread scans a different port.

In the for loop, I have added the Thread class, passing in the target function raw_scanner along with its arguments target and port. With this modification, a thread is created for each port, and instead of waiting for the entire raw_scanner process to complete for a given port, the script proceeds to the next port in the loop while the previous thread continues running in the background.

### Error Handling and Debugging
After running the code, you encountered numerous errors. To address this issue, I attempted to improve the exception handling by incorporating try and except blocks. However, even with these adjustments, the errors persisted. During research, I discovered the screenlock function and decided to test its functionality.

```python
def raw_scanner(target, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        ex = s.connect_ex((target, port))
        if ex == 0:
            print(f"[+] {port} /tcp open")
        s.close()
    except Exception as e:
        print(f"[!] Error: {e}")
```

#### Improving Threading by adding screenlock function
The errors persist despite my efforts to improve exception handling using try and except blocks. In order to understand the issue further, I conducted additional research. During my investigation, I came across the screenlock function, which seemed promising. This function allows me to lock the screen for the thread that wants to print and then continue executing. However, I realized that if I attempted to print messages like "Trying to connect with port X" or error messages, each port would lock the screen, resulting in undesired behavior. To address this, I decided to remove unnecessary printing functions and instead utilized the screenlock function from the semaphore class in the threading module. This ensures that only the ports that are open will have control over printing. Unfortunately, I had to retain the exception error messages for printing in order to better understand and diagnose the errors I was still encountering.


```python
def raw_scanner(target, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        ex = s.connect_ex((target, port))
        if ex == 0:
            screenLock.acquire()
            print(f"[+] {port} /tcp open")
        s.close()
    except Exception as e:
        screenLock.acquire()
        print(f"[!] Error: {e}")
    screenLock.release()
```

#### Limiting Active Threads
After conducting further research, I discovered the root cause of the issue. It appears that the scanner was executing too quickly, resulting in the inability to close sockets faster than creating and connecting them. To resolve this problem, I realized that limiting the number of active threads could provide a solution. I experimented with different thread limits, aiming to strike a balance between maximizing active threads, minimizing errors, and reducing the overall scanning time.

Ultimately, I settled on using 300 threads as a reasonable limit. This choice was driven by concerns about potential CPU or RAM limitations on different devices. However, I also contemplated the possibility of incorporating a mechanism that automatically detects the maximum number of threads based on the CPU power of the device. This would optimize the scanning process further.

By finding the optimal thread count, I was able to strike a balance between efficient resource utilization and minimizing scanning time.

```python
# using socket to create a raw packet and bind it to metasploitable 3
import socket
import threading

# the target ip addresss and ftp port
host_ip = '192.168.199.130'
screenLock = threading.Semaphore(value=1)
threads = []
def raw_scanner(target, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)
        ex = s.connect_ex((target, port))
        if ex == 0:
            screenLock.acquire()
            print(f"[+] {port} /tcp open")
            screenLock.release()
        s.close()
    except Exception as e:
        print(f"[!] Error: {e}")


# Creating the thread function with the target function i want
# the argument as the target ip and port
# for every port scan create a thread with the function and the arguments and go for the next one
# this saves time
for port in range(1,65535):
    # Limiting threading
    while threading.active_count() >= 300:
        pass

    t = threading.Thread(target=raw_scanner,args=(host_ip,int(port)))
    threads.append(t)
    t.start()


for t in threads:
    t.join()
```

### Parsing
For this stage, I introduced two functions: main and port_scan. The main function is responsible for handling user input, parsing it, and passing it as an input to the port_scan function. In addition, I implemented a feature that automatically initiates a scan of all ports if the user does not provide any specific port numbers. Another functionality I added is the option for the user to enable verbosity, which allows them to view both opened and closed ports during the scanning process. This feature enhances the flexibility and usability of the port scanning script, providing users with more control over the scanning parameters and output display.

```python
def main():
    global verbose
    parser = optparse.OptionParser("usage%prog -t <target host> -p <target port")
    parser.add_option('-t', dest='tgtHost', type='string', help='specify target host')
    parser.add_option('-p', dest='tgtPort', type='string', help='specify target port[s] separated by comma')
    parser.add_option('-v', dest='verbose', default=False, action='store_true', help='activate verbose')

    options, args = parser.parse_args()
    tgtHost = options.tgtHost
    tgtPorts = str(options.tgtPort).split(',')
    verbose = options.verbose

    # if none then default is scan all ports
    if tgtPorts[0] == 'None':
        tgtPorts = list(range(1, 65535))

    if tgtHost == None:
        print("[-] Specify a target host")
        exit(0)
    
    port_scan(tgtHost, tgtPorts)
```

The port_scan function focuses on combining the input received from the main function and threading it together with the raw_scanner function as an argument.

```python
def port_scan(tgtHost,tgtPorts):
    for port in tgtPorts:
        # Creating the thread function with the target function i want
        # the argument as the target ip and port
        # for every port scan create a thread with the function and the arguments and go for the next one
        # this saves time
        while threading.active_count() >= 300:
            pass

        t = threading.Thread(target=raw_scanner,args=(tgtHost,int(port)))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()
```


## Conclusion 
That was such a fun and exciting learning experience! I realized that there were a few things missing in my port scanner, like banner grabbing and having my own cool code banner.  I truly believe that I can take this scanner to a whole new level! To be honest, I used to avoid threading because it seemed way too complicated for me. I decided to step out of my comfort zone and get my hands dirty with it. I feel so proud of what I've accomplished, and it has given me the confidence to keep pushing myself and getting even better.


## Exciting Future Features:
In my journey of developing the port scanner, I have some awesome future features in mind that will take it to the next level:

- Service Identification (Banner Grabbing)
- Throttling
- vVulnerability Detection
- SScan Progress 
- Addition of Well-Known and Most-Used Ports
- Exploring Scapy

With these future features in mind, I am confident that the port scanner will evolve into a more comprehensive and effective tool. Stay tuned for more exciting updates on the progress!

# Disclaimer 
Remember to exercise caution and ensure you have appropriate authorization and legal permission before conducting any port scanning activities.

The port scanner provided in this blog is intended for educational and legitimate purposes only. It is designed to assist users in understanding and analyzing network protocols and services.

Please note that scanning and probing networks or devices without proper authorization may violate laws and infringe upon the privacy and security of others. Always obtain explicit permission from the network owner or system administrator before performing any scanning activities.

The author of this blog and the port scanner cannot be held responsible for any misuse, damages, or legal consequences resulting from the improper use of this tool. Users are solely responsible for their actions and should exercise caution and ethical judgment when utilizing the port scanner.

Please use this tool responsibly and for legitimate purposes only.