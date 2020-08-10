<?php
function redirect()
{
    if (isset($_SERVER['HTTP_REFERER'])) {
        header("Location: {$_SERVER['HTTP_REFERER']}");
    }
    die();
}
error_reporting(0);
if (!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest')) {
    redirect();
}

$token = "1302291134:AAHbdm4hn8gAweH5rztvYgCdN0z0BrdvT40";
$chat_id = "-335500386";

if (!isset($_POST["type"])) {
    redirect();
}

$txt = "";
$type = trim($_POST["type"]);
switch ($type) {
    case "modal":
        if (!isset($_POST["name"]) or !isset($_POST["phone"]) or !isset($_POST["ceiling_type"])) {
            redirect();
        }
        $name = htmlspecialchars(trim($_POST["name"]));
        $ceiling_type = htmlspecialchars(trim($_POST["ceiling_type"]));
        $phone = htmlspecialchars(trim($_POST["phone"]));
        $txt .= "<b>Тип формы:</b> модальное окно" . "\n";
        $txt .= "<b>Имя:</b> {$name}" . "\n";
        $txt .= "<b>Тип потолка:</b> {$ceiling_type}" . "\n";
        $txt .= "<b>Телефон:</b> {$phone}" . "\n";
        break;

    case "calculator":
        $ceiling_types = ["Классический", "Перфорированный", "Звездный", "Тканевый", "Парящий", "Фотопечать", "Уровневый", "Световые линии"];
        $additions = ["Люстры", "Светильники", "Световые линии", "LED подсветка"];
        $contact_types = ["Telegram", "SMS", "Viber", "Звонок"];

        if (!isset($_POST["contact_type"]) or !isset($_POST["phone"]) or !isset($_POST["ceiling_type"]) or !isset($_POST["square"]) or !isset($_POST["extra_elements"])) {
            redirect();
        }
        $sq = htmlspecialchars(trim($_POST["square"]));
        $ceiling_type = intval($_POST["ceiling_type"]) - 1;
        $txt .= "<b>Тип формы:</b> калькулятор" . "\n";
        $txt .= "<b>Площадь:</b> {}" . "\n";
        $txt .= "<b>Тип потолка:</b> {$ceiling_types[$ceiling_type]}" . "\n";
        $ex_el = "";
        for ($i = 0; $i < count($_POST["extra_elements"]); $i++) {
            $ex_el .= $additions[intval($_POST["extra_elements"][$i]) - 1] . ($i + 1 == count($_POST["extra_elements"]) ? "" : ", ");
        }
        $txt .= "<b>Дополнительные элементы:</b> {$ex_el}" . "\n";
        $txt .= "<b>Тип связи:</b> {$contact_types[intval($_POST["contact_type"])-1]}" . "\n";
        $txt .= "<b>Телефон:</b> {$_POST["phone"]}" . "\n";
        break;

    case "request":
        if (!isset($_POST["name"]) or !isset($_POST["phone"])) {
            redirect();
        }
        $name = htmlspecialchars(trim($_POST["name"]));
        $phone = htmlspecialchars(trim($_POST["phone"]));
        $txt .= "<b>Тип формы:</b> заявка" . "\n";
        $txt .= "<b>Имя:</b> {$name}" . "\n";
        $txt .= "<b>Телефон:</b> {$phone}" . "\n";
        break;

    default:
        redirect();
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text=". urlencode($txt) , "r");
if ($sendToTelegram) {
    echo "success";
}