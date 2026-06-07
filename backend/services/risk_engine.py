class RiskEngine:

    def calculate(
        self,
        severity_summary,
        open_port_count,
        ssl_grade
    ):

        score = 0

        score += severity_summary["critical"] * 30

        score += severity_summary["high"] * 15

        score += severity_summary["medium"] * 5

        score += severity_summary["low"] * 2

        score += open_port_count * 2

        ssl_penalty = {
            "A+": 0,
            "A": 0,
            "B": 5,
            "C": 10,
            "D": 20,
            "F": 30
        }

        score += ssl_penalty.get(
            ssl_grade,
            10
        )

        if score < 20:
            level = "Low"

        elif score < 50:
            level = "Medium"

        elif score < 80:
            level = "High"

        else:
            level = "Critical"

        return {
            "risk_score": score,
            "risk_level": level
        }