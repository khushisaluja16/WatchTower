# port scanning logic. Scans the port

import nmap
import os


class NmapService:

    def scan_target(
        self,
        target,
        scan_type="quick"
    ):

        nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"

        print("NMAP EXISTS:", os.path.exists(nmap_path))
        print("NMAP PATH:", nmap_path)

        scanner = nmap.PortScanner(
            nmap_search_path=(nmap_path,)
        )

        if scan_type == "quick":

            scan_args = "-T5 -F --version-light"

        else:

            scan_args = "-T4 -F -sV"

        scanner.scan(target, arguments=scan_args)

        results = {
            "target": target,
            "hosts": []
        }

        for host in scanner.all_hosts():

            host_data = {
                "ip": host,
                "ports": []
            }

            for proto in scanner[host].all_protocols():

                ports = scanner[host][proto].keys()

                for port in ports:

                    service = scanner[host][proto][port]
                    print(service)

                    host_data["ports"].append({
                        "port": port,
                        "state": service.get("state"),
                        "service": service.get("name"),
                        "product": service.get("product"),
                        "version": service.get("version")
                    })

            results["hosts"].append(host_data)

        return results