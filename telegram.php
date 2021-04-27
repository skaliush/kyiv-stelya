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

if (!isset($_POST["type"])) {
    redirect();
}

function intersectArray($arr)
{
	$out = true;
	foreach ($arr as $item) {
		$out = $out && $item;
	}
	return $out;
}

$token = "1106782743:AAHzh2chFinxwcHsS1ZAlsqEa4Gk4ZDUDL8";
$chats = [
    "472342732",
    "320457325",
];

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
        $txt .= "<b>Тип формы:</b> конкретный потолок" . "\n";
        $txt .= "<b>Имя:</b> {$name}" . "\n";
        $txt .= "<b>Тип потолка:</b> {$ceiling_type}" . "\n";
        $txt .= "<b>Телефон:</b> {$phone}" . "\n";
        break;

    case "calculator":
        $ceiling_types = ["Классический", "Перфорированный", "Звездный", "Тканевый", "Парящий", "Фотопечать", "Уровневый", "Световые линии"];
        $contact_types = ["Telegram", "SMS", "Viber", "Звонок"];

        if (!isset($_POST["contact_type"]) or !isset($_POST["phone"]) or !isset($_POST["ceiling_type"]) or !isset($_POST["square"])) {
            redirect();
        }
        $sq = htmlspecialchars(trim($_POST["square"]));
        $ceiling_type = intval($_POST["ceiling_type"]) - 1;
        $txt .= "<b>Тип формы:</b> калькулятор" . "\n";
        $txt .= "<b>Площадь:</b> {$sq}кв.м." . "\n";
        $txt .= "<b>Тип потолка:</b> {$ceiling_types[$ceiling_type]}" . "\n";
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

$sended = [];

foreach ($chats as $chat) {
	$sended[] = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat}&parse_mode=html&text=". urlencode($txt) , "r");
}

if (intersectArray($sended)) {
    echo 'success';
} else {
    echo 'fail';
}
